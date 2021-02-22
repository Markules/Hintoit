import React, { useEffect } from "react";
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
        console.log(props.users);
      return (
       <div className={classes.ListContainer}><UserCard key={user._id} user={user}/></div>
      );
    });
  } else {
    return <Spinner />;
  }
};

UsersList.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.users,
  loading: state.users.loading,
});

export default connect(mapStateToProps, { fetchAllUsers })(UsersList);
