import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../../../store/actions/items";
import Button from '../../../UI/Button/Button';

import classes from './CommentItem.module.css';

const CommentItem = ({
  itemId,
  comment: { _id, text, firstName, lastName, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div key={_id} className={classes.CommentsContainer}>
     
      <div>
      {!auth.loading && user === auth.userId && (
          <Button
            clicked={(e) => deleteComment(itemId, _id)}
            btnType="RemoveComment"
          > <span className={classes.delete}>x</span>
          </Button>
        )}
 
        <Link className={classes.UserLink} to={`/user/${user}`}>
        <h4 className={classes.UserName}>{firstName} {lastName}</h4>
          <img className={classes.Avatar} src={avatar} alt="" />
        </Link>
      </div>
      <div>
        <p className={classes.Text}>{text}</p>
        
      </div>
      <p className={classes.Date}>
          Posted <Moment ago={date} fromNow>{date}</Moment> ago
        </p>
    </div>
  );
};

CommentItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
