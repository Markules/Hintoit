import React from "react";
import { Link } from "react-router-dom";
import classes from "./UserCard.module.css";
import FollowButton from "./FollowButton/FollowButton";
import PropTypes from 'prop-types';


const UserCard = ({ user }) => {
  return (
    <div className={classes.CardContainer}>
      <Link to={`/user/${user._id}`} className={classes.UserLink}>
        <div>
          <img src={user.avatar} className={classes.Avatar} alt=""/>
          <span className={classes.NameContainer}>
            <p className={classes.Name}>
              {user.firstName} {user.lastName}
            </p>
            {user.following ? (
              <span>Following {user.following.length}</span>
            ) : (
              <span>0 Following</span>
            )}
          </span>
          {user.followers ? ( 
            <span>Followers {user.followers.length}</span>
          ) : (
            <span>0 Followers</span>
          )}
        </div>
      </Link>
      <FollowButton user={user} />
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
}

export default (UserCard);
