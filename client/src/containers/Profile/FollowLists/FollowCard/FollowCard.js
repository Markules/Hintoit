import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import classes from "./FollowCard.module.css";
import FollowButton from "../../../../components/Users/UserCard/FollowButton/FollowButton";

const FollowCard = ({ user }) => {
  console.log(user);

  return (
    <div className={classes.CardContainer}>
      <Link className={classes.UserLink} to={`/user/${user._id}`}>
        <img className={classes.Avatar} src={user.avatar} alt="" />
        <h2 className={classes.UserName}>
          {user.firstName} {user.lastName}
        </h2>
      </Link>
      <FollowButton className={classes.FollowButton} user={user} />
    </div>
  );
};

FollowCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default FollowCard;
