import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import AuthPage from "./views/AuthPage";
import GamePage from "./views/GamePage";
import Nav from "./components/Nav/Nav";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

const options = {
  standard: [6, 5],
  big: [10, 8],
};

export default class RootPage extends Component {
  state = {
    test: "test value from App",
    isNavOpen: false,
    userAuthenticated: false,
    user: {},
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log("decoded token");
      console.log(decoded);
      this.setCurrentUser(decoded);
      this.setState({
        userAuthenticated: true,
      });
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        this.setCurrentUser({});
        window.location.href = "./login";
      }
    }
  }

  toggleNav = () => {
    this.setState((prevState) => ({
      isNavOpen: !prevState.isNavOpen,
    }));
  };

  closeNav = () => {
    this.setState({
      isNavOpen: false,
    });
  };

  setCurrentUser = (data) => {
    console.log(data);
    const user = {
      username: data.username,
      userID: data.userID,
      createdAt: data.createdAt,
    };
    console.log("setCurrentUSer");
    console.log(user);
    this.setState({
      userAuthenticated: true,
      user,
    });
  };

  logoutUser = () => {
    console.log("logout user");
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.setState({
      user: {},
      userAuthenticated: false,
    });
    window.location.href = "./login";
  };

  render() {
    const { toggleNav, closeNav, setCurrentUser, logoutUser } = this;
    const { isNavOpen, userAuthenticated, user } = this.state;

    const navProps = {
      toggleNav,
      closeNav,
      isNavOpen,
      userAuthenticated,
      logoutUser,
    };

    const mainPageProps = {
      user,
      userAuthenticated,
    };
    return (
      <Router>
        <Nav {...navProps} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <MainPage {...props} {...mainPageProps} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <AuthPage {...props} setCurrentUser={setCurrentUser} />
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <AuthPage {...props} setCurrentUser={setCurrentUser} />
            )}
          />
          <Route
            exact
            path="/game"
            render={(props) => <GamePage {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}
