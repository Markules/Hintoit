import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { followUser } from "../../../store/actions/users";

import classes from "./UserCard.module.css";
import { connect } from "react-redux";

const UserCard = (props) => {
  console.log(props);
  return (
    <div className={classes.CardContainer}>
      <Link to={`/user/${props.user._id}`} className={classes.UserLink}>
        <div>
          <img src={props.user.avatar} className={classes.Avatar} />
          <span className={classes.NameContainer}>
            <p className={classes.Name}>
              {props.user.firstName} {props.user.lastName}
            </p>
          </span>
        </div>
      </Link>
      <Button clicked={() => props.followUser(props.user._id)} btnType={"Follow"}>
        Follow
      </Button>
    </div>
  );
};

export default connect(null, { followUser })(UserCard);
