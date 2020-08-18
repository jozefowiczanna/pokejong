import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import AuthPage from "./views/AuthPage";
import GamePage from "./views/GamePage";
import AccountPage from "./views/AccountPage";
import ScoresPage from "./views/ScoresPage";
import Nav from "./components/Nav/Nav";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import moment from "moment";
import axios from "axios";
import { sortArray } from "./utils/utils";

export default class RootPage extends Component {
  state = {
    test: "test value from App",
    isNavOpen: false,
    userAuthenticated: false,
    user: {},
    userScores: {
      all: [],
      best: [],
      msg: ""
    },
    allScores: [],
  };

  componentDidMount() {
    this.authenticate();
    this.getAllScores();
  }

  authenticate = () => {
    const accountPath = window.location.pathname === "/account" ? true : false;
    if (!localStorage.jwtToken && accountPath) {
      window.location.href = "/login";
      return;
    }
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      this.setCurrentUser(decoded);
      this.getUserScores(decoded.userID);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        this.setCurrentUser({});
        if (accountPath) {
          window.location.href = "/login";
        }
      }
    }
  };

  getUserScores = (userID) => {
    axios.get(`/api/user/${userID}`).then((res) => {
      let userScores = {...this.state.userScores};
      if (res.data.length === 0) {
        userScores.msg = "No results yet."
        this.setState({ userScores });
        return;
      }
      const all = res.data.map((item) => {
        const newDate = new Date(item.createdAt); // get the correct timezone
        item.createdAt = moment(newDate).format("DD.MM.YYYY HH:mm");
        return item;
      });
      const best = sortArray([...all], "seconds");
      userScores = {
        all,
        best,
        msg: ""
      };
      this.setState({ userScores });
    });
  };
  
  getAllScores = () => {
    axios.get('/api/scores')
    .then(res => {
      const allScores = res.data.map((item) => {
        const newDate = new Date(item.createdAt); // get the correct timezone
        item.createdAt = moment(newDate).format("DD.MM.YYYY HH:mm");
        return item;
      });
      this.setState({allScores});
    })
    .catch(err => {
      console.log(err);
    })
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
    const newDate = new Date(data.createdAt); // get the correct timezone
    const dateFormatted = moment(newDate).format("DD.MM.YYYY HH:mm");

    const user = {
      username: data.username,
      createdAt: dateFormatted,
    };
    this.setState({
      userAuthenticated: true,
      user,
    });
  };

  logoutUser = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.setState({
      user: {},
      userAuthenticated: false,
    });
    window.location.href = "/login";
  };

  render() {
    const {
      toggleNav,
      closeNav,
      setCurrentUser,
      logoutUser,
      getUserScores,
      getAllScores
    } = this;
    const { isNavOpen, userAuthenticated, user, userScores, allScores } = this.state;

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

    const authPageProps = {
      userAuthenticated,
      setCurrentUser,
      getAllScores,
      getUserScores
    };

    const gamePageProps = {
      userAuthenticated,
      getUserScores,
    };

    const accountPageProps = {
      userAuthenticated,
      user,
      userScores,
    };

    const scoresPageprops = {
      allScores
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
            render={(props) => <AuthPage {...props} {...authPageProps} />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <AuthPage {...props} {...authPageProps} />}
          />
          <Route
            exact
            path="/game"
            render={(props) => <GamePage {...props} {...gamePageProps} />}
          />
          <Route
            exact
            path="/scores"
            render={(props) => <ScoresPage {...props} {...scoresPageprops} />}
          />
          <Route
            exact
            path="/account"
            render={(props) => <AccountPage {...props} {...accountPageProps} />}
          />
        </Switch>
      </Router>
    );
  }
}
