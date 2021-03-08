import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../../../store/actions/items";

import classes from './CommentForm.module.css';

const CommentForm = ({ itemId, addComment}) => {
  
  const [ text, setText ] = useState('')
    return (
    <div className={classes.CommentFormContiner}>
      <form
        className={classes.Form}
        onSubmit={(e) => {
          e.preventDefault();
          addComment(itemId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          className={classes.TextArea}
          placeholder="Leave a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className={classes.CommentSubmit} value="SUBMIT" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
