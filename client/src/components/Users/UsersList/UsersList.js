import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../store/actions/users";
import PropTypes from "prop-types";
import Spinner from "../../UI/Spinner/Spinner";
import UserCard from '../UserCard/UserCard';

import classes from './UsersList.module.css';

const UsersList = (props) => {
  useEffect(() => {
    props.fetchAllUsers();
  }, []);



  if (!props.loading && props.users !== null) {
    return props.users.map((user) => {
      if(user._id === props.loggedUserId){
        return <span key={0}></span>;
      }
      return (
       <div className={classes.ListContainer}><UserCard key={user._id} user={user}/></div>
      );
    });
  } 
    return <Spinner />;
};

UsersList.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  loggedUserId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.users,
  loading: state.users.loading,
  loggedUserId: state.auth.userId
});

export default connect(mapStateToProps, { fetchAllUsers })(UsersList);
