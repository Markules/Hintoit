import React, { useEffect } from "react";
import { connect } from "react-redux";
import BottomBar from "./BottomBar/BottomBar";

import classes from "./ItemCard.module.css";

const ItemCard = (props) =>

  props.item ? (
    <div key={props.item.id} className={classes.CardContainer}>
      <p>{props.item.title}</p>
      <div className={classes.CardImage}></div>
      <div className={classes.BarContainer}><BottomBar item={props.item}/></div>
    </div>
  ) : null;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
