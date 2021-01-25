import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Aux from "../../../../../../../hoc/Aux/Aux";

import classes from "./Like.module.css";

const Like = (props) => {
  const [isLike, updateLike] = useState(false);

  useEffect(() => {
    if (props.item.likedBy.includes(props.userId)) {
      updateLike(true);
    }
  }, []);

  return (
    <Aux>
      {!isLike 
      ?(<i className="material-icons">favorite_border</i>
      ): <i className="material-icons">favorite</i> }
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    likedItems: state.items.userItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);
