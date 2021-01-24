import React, { useEffect } from "react";
import { connect } from "react-redux";

import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import Spinner from "../../UI/Spinner/Spinner";
import ItemCard from "./ItemCard/ItemCard";

import classes from './ItemsList.module.css';

const ItemsList = (props) => {
  
    useEffect(() => {
    props.onFetchItems();
  }, []);

  let items = <Spinner />;
  if (!props.loading && props.items !== null) {
    items = props.items.map((item) => (
     <ItemCard item={item}/>
    ));
  }
  return <div className={classes.ItemsContainer}>{items}</div>;
};

const mapStateToProps = (state) => {
  return {
    items: state.items.userItems,
    loading: state.items.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchItems: () => dispatch(actions.fetchLoggedUserItems()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ItemsList, axios));
