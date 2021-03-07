import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import ItemCard from "../ItemsList/ItemCard/ItemCard";
import { connect } from "react-redux";
import { getItem } from "../../../store/actions/items";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router";
import CommentForm from "./CommentForm/CommentForm";

import classes from './Item.module.css';
import CommentItem from "./CommentItem/CommentItem";

const Item = ({ getItem, location, match, item, loading}) => {
 

  useEffect(() => {
    getItem(match.params.id);
  }, [getItem]);


  return loading === true || item === null ? (
    <Spinner /> ) : (
      <div className={classes.CardContainer}>
      <ItemCard item={item} cardType={location.state.cardType} />
      <CommentForm itemId={item._id}/>
      <div>{item.comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} itemId={item._id} />
      ))}
      </div>
    </div>
  );
};

Item.propTypes = {
  getItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.items.item,
  loading: state.items
});

export default connect(mapStateToProps, { getItem })(withRouter(Item));
