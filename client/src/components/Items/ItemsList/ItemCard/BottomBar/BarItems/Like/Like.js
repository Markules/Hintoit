import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../../../../UI/Button/Button";
import { likeItem, unlikeItem } from "../../../../.././../../store/actions";
import PropTypes from "prop-types";

import classes from "./Like.module.css";

const Like = (props) => {
  let likesLength = props.item.likes.length !== 0 ? props.item.likes.length : 0;

  const [like, updateLike] = useState(null);

  const [likesAmount, updateLikesAmount] = useState(likesLength);

  useEffect(() => {
    const user = props.item.likes.map((like) => like.user);
    user.includes(props.userId) ? updateLike(true) : updateLike(false);
  }, []);

  let likeButton = like ? (
    <Button clicked={() => handleUnlike()} btnType={"LikeButton"}>
      <i className={[classes.LikedIcon, "material-icons"].join(" ")}>
        favorite
      </i>
      {likesAmount}
    </Button>
  ) : (
    <Button clicked={() => handleLike()} btnType={"UnlikeButton"}>
      <i className={[classes.UnlikedIcon, "material-icons"].join(" ")}>
        favorite_border
      </i>
      {likesAmount}
    </Button>
  );
  const handleLike = () => {
    updateLikesAmount(likesAmount + 1);
    updateLike(true);
    props.likeItem(props.item._id);
  };

  const handleUnlike = () => {
    updateLikesAmount(likesAmount - 1);
    updateLike(false);
    props.unlikeItem(props.item._id);
  };

  return <Fragment>{likeButton}</Fragment>;
};

Like.propTypes = {
  likeItem: PropTypes.func.isRequired,
  unlikeItem: PropTypes.func.isRequired,
  userId: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { likeItem, unlikeItem })(Like);
