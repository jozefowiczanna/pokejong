import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./styles/RegisterPage.module.scss";
import cx from "classnames";
import axios from "axios";
// import jwt_decode from "jwt-decode";
// import setAuthToken from "../utils/setAuthToken";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    success: false,
    errors: { login: {}, register: {} },
  };

  handleSubmit = (e, path) => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("/api/user/register", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          success: true,
        });
        // this.props.history.push("/login");
      })
      .catch((err) => {
        console.log("errors");
        console.log(err.response.data);
        this.setState((prevState) => ({
          errors: { login: {}, register: err.response.data },
        }));
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
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
                <h2 className="title is-4 has-text-centered">Register</h2>
                <form
                  className={cx(styles["form"])}
                  onSubmit={(e) => this.handleSubmit(e)}
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
                      <p className="help is-danger">
                        {errors.register.username}
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
                      <p className="help is-danger">
                        {errors.register.password}
                      </p>
                    </div>
                  </div>
                  <button className="button is-warning mt-5 mb-5">
                    Sign up!
                  </button>
                  <div>Already have an account?</div>
                  <Link className="link" to="/login">
                    Sign in!
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterPage;
