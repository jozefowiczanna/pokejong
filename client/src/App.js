import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import RegisterPage from "./views/RegisterPage";
import GamePage from "./views/GamePage";
import Nav from "./components/Nav/Nav";

const options = {
  standard: [6, 5],
  big: [10, 8],
};

export default class RootPage extends Component {
  state = {
    test: "test value from App",
    isNavOpen: false,
  };

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

  render() {
    const { toggleNav, closeNav } = this;
    const { isNavOpen } = this.state;
    return (
      <Router>
        <div className="bodybg"></div>
        <Nav toggleNav={toggleNav} closeNav={closeNav} isNavOpen={isNavOpen} />
        <Switch>
          <Route exact path="/" render={(props) => <MainPage {...props} />} />
          <Route
            exact
            path="/register"
            render={(props) => <RegisterPage {...props} />}
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
