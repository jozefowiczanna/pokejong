import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import styles from "./styles/AuthPage.module.scss";
import cx from "classnames";
import setAuthToken from "../utils/setAuthToken";

class AuthPage extends Component {
  state = {
    username: "",
    password: "",
    success: false,
    errors: { login: {}, register: {} },
  };

  componentDidMount() {
    console.log(this.props.userAuthenticated);
    if (this.props.userAuthenticated) {
      // window.location.
      this.props.history.push("/");
    }
  }
  componentDidUpdate() {
    console.log(this.props.userAuthenticated);
    if (this.props.userAuthenticated) {
      // window.location.
      this.props.history.push("/");
    }
  }

  // {userAuthenticated && <Redirect to="/" />}

  handleSubmit = (e, path) => {
    e.preventDefault();
    if (this.state.success) {
      this.setState({
        success: false,
        errors: { login: {}, register: {} },
      });
    }
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    if (path === "register") {
      axios
        .post("/api/user/register", userData)
        .then((res) => {
          this.setState({
            success: true,
            username: "",
            password: "",
          });
          this.props.history.push("/login");
        })
        .catch((err) => {
          this.setState({
            errors: { login: {}, register: err.response.data },
          });
        });
      return;
    }
    if (path === "login") {
      axios
        .post("/api/user/login", userData)
        .then((res) => {
          const { token } = res.data;
          // console.log(token);

          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          const decoded = jwt_decode(token);
          // console.log(decoded, "decoded");
          this.props.setCurrentUser(decoded);
          this.props.history.push("/");
        })
        .catch((err) => {
          if (err.response) {
            this.setState({
              errors: { register: {}, login: err.response.data },
            });
          }
          console.log(err.response);
        });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const path = this.props.location.pathname.substr(1);
    const { errors, success } = this.state;
    return (
      <>
        <div className="modal is-active">
          <div
            className={cx(
              "modal-background",
              styles["modal-background--secondary"]
            )}
          ></div>
          <div className={cx("modal-content", styles["modal-content--login"])}>
            <div className={cx(styles["box-outer"])}>
              <div className={cx("box", styles["box-centered"])}>
                <h2 className="title is-4 has-text-centered">
                  {path === "register" ? "Register" : "Login"}
                </h2>
                <form
                  className={cx(styles["form"])}
                  onSubmit={(e) => this.handleSubmit(e, path)}
                >
                  <div>
                    {success && (
                      <div className="registered-anim notification is-success has-text-centered">
                        You have successfully registered!
                        <br />
                        You can log in!
                      </div>
                    )}
                    <div className="field">
                      <label className="label">Username</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          onChange={this.handleChange}
                          name="username"
                          value={this.state.username}
                        />
                      </div>
                      <p className="help is-size-6 is-danger">
                        {errors[path].username}
                      </p>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          onChange={this.handleChange}
                          name="password"
                          value={this.state.password}
                        />
                      </div>
                      <p className="help is-size-6 is-danger">
                        {errors[path].password}
                      </p>
                    </div>
                  </div>
                  <button className="button is-warning mt-5 mb-5">
                    {path === "register" ? "Sign up" : "Sign in"}
                  </button>
                  <div>
                    {path === "register"
                      ? "Already have an account?"
                      : "No account yet?"}
                  </div>
                  <Link
                    className="link"
                    to={path === "register" ? "/login" : "/register"}
                  >
                    {path === "register" ? "Sign in!" : "Sign up!"}
                  </Link>
                  or <Link to="/">Play as a guest!</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AuthPage;
