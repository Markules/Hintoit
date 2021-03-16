import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFollowersUsers } from "../../../../store/actions/profile";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import FollowCard from "../FollowCard/FollowCard";

import classes from "./FollowersList.module.css";

const FollowersList = ({ getFollowersUsers, location, followers, loading }) => {
  useEffect(() => {
    getFollowersUsers(location.state);
  }, [getFollowersUsers, location.state]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className={classes.Title}>Followers</h1>
          <div className={classes.FollowersList}>
            {followers.length > 0 ? (
              followers.map((follower) => (
                <FollowCard user={follower} key={follower._id} />
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

FollowersList.propTypes = {
  getFollowersUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  followers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  followers: state.profile.followers,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getFollowersUsers })(FollowersList);
