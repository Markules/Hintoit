import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";

import classes from "./Layout.module.css";

const Layout = (props) => {


  return (
    <Aux>
      <ToolBar
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
