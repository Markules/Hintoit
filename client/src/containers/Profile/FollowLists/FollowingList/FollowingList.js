import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFollowingUsers } from "../../../../store/actions/profile";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import FollowCard from "../FollowCard/FollowCard";

import classes from "./FollowingList.module.css";

const FollowingList = ({ getFollowingUsers, location, following, loading }) => {
  
  console.log("following", location)
    useEffect(() => {
    getFollowingUsers(location.state);
  }, [getFollowingUsers, location.state]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className={classes.Title}>Following</h1>
          <div className={classes.FollowingList}>
            {following.length > 0 ? (
              following.map((follow) => (
                <FollowCard user={follow} key={follow._id} />
              ))
            ) : (
              <h4 className={classes.NoUsers}>No users found...</h4>
            )}
          </div>
        </Fragment>
      )}
      <div className={classes.Divider}></div>
    </Fragment>
  );
};

FollowingList.propTypes = {
  getFollowingUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  following: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  following: state.profile.following,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getFollowingUsers })(FollowingList);
