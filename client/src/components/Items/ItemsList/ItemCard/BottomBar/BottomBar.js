import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Like from "./BarItems/Like/Like";
import Save from "./BarItems/Save/Save";

import classes from "./BottomBar.module.css";

const BottomBar = (props) => (
    <ul className={classes.BarList}>
        <li><Like item={props.item}/></li>
        <li><Save item={props.item} /></li>
        <li>Hint</li>
    </ul>

)

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
