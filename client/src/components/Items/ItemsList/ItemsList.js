import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchLoggedUserItems, fetchAllItems} from '../../../store/actions/items'
import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../UI/Spinner/Spinner";
import ItemCard from "./ItemCard/ItemCard";

import classes from "./ItemsList.module.css";

const ItemsList = ({ fetchAllItems, fetchLoggedUserItems, items, loading, cardType}) => {
  useEffect(() => {
    if(cardType === 'profile')
  return fetchLoggedUserItems();
    if(cardType === 'discover')
    return fetchAllItems();

  }, [ fetchLoggedUserItems, fetchAllItems ]);

  let fetchedItems = (
    <div className={classes.Spinner}>
      <Spinner />
    </div>
  );
  if (!loading && items !== null) {
    fetchedItems = items.map((item => (<ItemCard key={item.id} item={item} cardType={cardType}/>
      )))
  } else if (!loading && items === null) {
    fetchedItems = (
      <div className={classes.NoItemsContainer}>
        <h2>
          No items here..<br></br>
          <br></br>Add More Items to wishlist
        </h2>
      </div>
    );
  }
  return <div className={classes.ItemsContainer}>{fetchedItems}</div>;
};

const mapStateToProps = (state) => {
  return {
    items: state.items.userItems,
    loading: state.items.loading,

  };
};

export default connect(
  mapStateToProps,
  { fetchAllItems, fetchLoggedUserItems }
)(withErrorHandler(ItemsList, axios));
