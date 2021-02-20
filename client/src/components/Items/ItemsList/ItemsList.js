import React, { useEffect } from "react";
import { connect } from "react-redux";

import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import Spinner from "../../UI/Spinner/Spinner";
import ItemCard from "./ItemCard/ItemCard";

import classes from "./ItemsList.module.css";

const ItemsList = (props) => {
  useEffect(() => {
    if(props.cardType === 'profile')
  return props.onFetchUserItems();
    if(props.cardType === 'discover')
    return props.onFetchAllItems();

  }, []);

  let items = (
    <div className={classes.Spinner}>
      <Spinner />
    </div>
  );
  if (!props.loading && props.items !== null) {
    items = props.items.map((item) => <ItemCard key={item.id} item={item} cardType={props.cardType}/>);
  } else if (!props.loading && props.items === null) {
    items = (
      <div className={classes.NoItemsContainer}>
        <h2>
          No items here..<br></br>
          <br></br>Add More Items to wishlist
        </h2>
      </div>
    );
  }
  return <div className={classes.ItemsContainer}>{items}</div>;
};

const mapStateToProps = (state) => {
  return {
    items: state.items.userItems,
    loading: state.items.loading,
    status: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserItems: () => dispatch(actions.fetchLoggedUserItems()),
    onFetchAllItems: () => dispatch(actions.fetchAllItems()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ItemsList, axios));
