import React from "react";
import { Link } from "react-router-dom";

import classes from "./UserCard.module.css";

const UserCard = (props) => {
  console.log(props);
  return (
    <div className={classes.CardContainer}>
    <Link to={`/user/${props.user._id}`} className={classes.UserLink}><div >
      <img src={props.user.avatar} className={classes.Avatar} />
      <span className={classes.NameContainer}>
        <p className={classes.Name}>{props.user.firstName} {props.user.lastName}</p>
      </span>
    </div>
    </Link>
    </div>
  );
};

export default UserCard;
