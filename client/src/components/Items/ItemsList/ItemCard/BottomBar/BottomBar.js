import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Like from "./BarItems/Like/Like";
import Save from "./BarItems/Save/Save";
import Share from "./BarItems/Share/Share";

import classes from "./BottomBar.module.css";

const BottomBar = (props) => (
  <div className={classes.Container}>
    <ul className={classes.BarList}>
        <li><Like item={props.item}/></li>
        <li><Save item={props.item} /></li>
        <li><Share item={props.item}/></li>
    </ul>
    </div>
)

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
