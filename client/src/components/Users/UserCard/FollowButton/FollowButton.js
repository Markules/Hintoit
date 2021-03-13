import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, unFollowUser } from "../../../../store/actions/users";
import Button from "../../../UI/Button/Button";

import classes from "./FollowButton.module.css";

const FollowButton = ({ followUser, unFollowUser, user, loggedUser }) => {
  
  console.log("id", user)
  
  const [isFollow, setFollowStatus] = useState(
    loggedUser.following.includes(user._id)
  );

  const [button, setButton ] = useState(null)    

  useEffect(() => {
    isFollow
      ? (setButton(
          <Button
            className={classes.ButtonContainer}
            clicked={() => onUnFollow(user._id)}
            btnType={"Follow"}
          >
            Unfollow
          </Button>
        ))
      : (setButton(
          <Button
            className={classes.ButtonContainer}
            clicked={() => onFollow(user._id)}
            btnType={"Follow"}
          >
            Follow
          </Button>
        ));
  }, []);

  const onFollow = (id) => {
    followUser(id);
    setFollowStatus(true);
    setButton(<Button
        className={classes.ButtonContainer}
        clicked={() => onUnFollow(user._id)}
        btnType={"Follow"}>Unfollow</Button>)
  }

  const onUnFollow = (id) => {
    unFollowUser(id);
    setFollowStatus(false);
    setButton(  <Button
        className={classes.ButtonContainer}
        clicked={() => onFollow(user._id)}
        btnType={"Follow"}
      >Follow</Button>)
  }

  return <Fragment>{button}</Fragment>;
};

FollowButton.propTypes = {
  followUser: PropTypes.func.isRequired,
  unFollowUser: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUser: state.profile.userData,
});

export default connect(mapStateToProps, { followUser, unFollowUser })(
  FollowButton
);
