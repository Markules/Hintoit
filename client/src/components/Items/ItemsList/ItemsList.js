import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchLoggedUserItems,
  fetchAllItems,
  fetchItemsByUserId,
} from "../../../store/actions/items";
import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../UI/Spinner/Spinner";
import ItemCard from "./ItemCard/ItemCard";

import classes from "./ItemsList.module.css";
import CatagoryContainer from "./Catagory/CatagoryContainer/CatagoryContainer";

const ItemsList = ({
  fetchAllItems,
  fetchLoggedUserItems,
  fetchItemsByUserId,
  items,
  loading,
  cardType,
  userId,
}) => {
  useEffect(() => {
    if (cardType === "profile") return fetchLoggedUserItems();
    if (cardType === "discover") return fetchAllItems();
    if (cardType === "friend") {
      return fetchItemsByUserId(userId);
    }
  }, [fetchLoggedUserItems, fetchAllItems, fetchItemsByUserId, cardType, userId]);

  const [query, setQuery] = useState(null);

  let fetchedItems = (
    <div className={classes.Spinner}>
      <Spinner />
    </div>
  );
  if (!loading && items !== null) {
    fetchedItems =
      query === null
        ? items.map((item) => (
            <ItemCard key={item.id} item={item} cardType={cardType} />
          ))
        : items
            .filter((item) => item.catagories.includes(query))
            .map((filteredItem) => (
              <ItemCard
                key={filteredItem.id}
                item={filteredItem}
                cardType={cardType}
              />
            ));
  } else if (!loading && items === null) {
    fetchedItems = (
      <div className={classes.NoItemsContainer}>
        <h2>No items found..</h2>
      </div>
    );
  }
  return (
    <div className={[classes.ItemsContainer, `${cardType}`].join(' ')}>
      <div className={classes.CatagoryBox}>
        <span
          style={{ backgroundColor: "black", color: "white", fontWeight: 'bold', flex: "none" }}
          className={classes.DefualtCatagory}
          onClick={() => setQuery(null)}
        >
          ALL
        </span>
        {items &&
          items.map((item) => (
            <CatagoryContainer
              key={item._id}
              catagories={item.catagories}
              setQuery={setQuery}
            />
          ))}
      </div>
      {fetchedItems}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items.userItems,
    loading: state.items.loading,
  };
};

export default connect(mapStateToProps, {
  fetchAllItems,
  fetchLoggedUserItems,
  fetchItemsByUserId,
})(withErrorHandler(ItemsList, axios));
