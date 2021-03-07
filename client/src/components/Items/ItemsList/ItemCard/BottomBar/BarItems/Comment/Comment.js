import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import classes from "./Comment.module.css";

const Comment = ({ item, cardType }) => {
  return (
    <Link
      to={{
        pathname: `/item/${item._id}`,
        state: { itemId: item._id, cardType, item: item  },
      }}
      className={classes.ItemLink}
    >
      <i className={[classes.commentIcon, "material-icons"].join(" ")}>
        chat_bubble_outline
      </i>
      {item.comments.length > 0 ? (
        <span>{item.comments.length}</span>
      ) : (
        <span>0</span>
      )}
    </Link>
  );
};

Comment.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Comment;
