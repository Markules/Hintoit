import React, { useEffect } from "react";
import { connect } from "react-redux";

import classes from "./ItemCard.module.css";

const ItemCard = (props) =>
  props.item ? (
    <div key={props.item.id} className={classes.CardContainer}>
      <p>{props.item.title}</p>
      <p>{props.item.url}</p>
    </div>
  ) : null;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
