import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Login.module.css";
import * as actions from "../../../store/actions/auth";

export class Login extends Component {
  render() {
    return (
      <div className={classes.loginPage}>
        <div className={classes.welcomeContainer}>
          <h2 className={classes.welcomeMessage}>Welcome To Hintoit</h2>
        </div>

        <div className={classes.loginContainer}>
          <div className={classes.loginContent}>
              <a className={classes.buttonContent} href="/auth/google">
              <button className={classes.googleLoginButton}>
                Sign In with Google
                </button>
              </a>
            
          </div>
        </div>
        <span className={classes.upperWrap}></span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.userId !== null,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(actions.auth()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
