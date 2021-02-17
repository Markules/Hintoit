import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Aux from "../../../../../../../hoc/Aux/Aux";
import Button from "../../../../../../UI/Button/Button";
import * as actions from "../../../../.././../../store/actions";

import classes from "./Like.module.css";

const Like = (props) => {
  let likesLength = props.item.likedBy.length !== 0 ? props.item.likedBy.length : 0;

  const [like, updateLike] = useState(props.isLiked);

  const [likesAmount, updateLikesAmount] = useState(likesLength);

  useEffect(() => {
    props.item.likedBy.includes(props.userId)
      ? updateLike(true)
      : updateLike(false);
  }, [props.item.likedBy]);

  let likeButton = like ? (
    <Button clicked={() => handleUnlike()} btnType={"likeButton"}>
      <i className={[classes.LikedIcon, "material-icons"].join(" ")}>
        favorite
      </i>
      {likesAmount}
    </Button>
  ) : (
    <Button clicked={() => handleLike()} btnType={"likeButton"}>
      <i className={[classes.UnlikedIcon, "material-icons"].join(" ")}>
        favorite_border
      </i>
      {likesAmount}
    </Button>
  );
  const handleLike = () => {
    updateLikesAmount(likesAmount +1);
    updateLike(true);
    props.like(props.item._id);
  };

  const handleUnlike = () => {
    updateLikesAmount(likesAmount -1);
    updateLike(false);
    props.unlike(props.item._id);
  };

  return <Aux>{likeButton}</Aux>;
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    items: state.items.userItems,
    isLiked: state.items.isLiked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    like: (itemId) => dispatch(actions.likeItem(itemId)),
    unlike: (itemId) => dispatch(actions.unlikeItem(itemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);
