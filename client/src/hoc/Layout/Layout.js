import React, { Fragment } from "react";
import { connect } from "react-redux";

import ToolBar from "../../components/Navigation/ToolBar/ToolBar";

import classes from "./Layout.module.css";
import Alert from "../../components/Alert/Alert";

const Layout = (props) => {
  return (
    <Fragment>
      <ToolBar isAuth={props.isAuthenticated} />

      <main className={classes.Content}>
        <Alert />
        {props.children}
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
