import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./ProfileNavBar.module.css";
import * as actions from '../../../store/actions';


const ProfileNavBar = (props) => {
  

  useEffect(() => {
    props.onFetchItems();
  }, []);

  const user = props.userData;

  return (
    <ul className={classes.navContainer}>
      <li className={classes.listItem}>
        <Link to="followers">
          <p>Followers {user.followers.length ? user.followers.length : 0}</p>
        </Link>
      </li>
      <li className={classes.listItem}>
        <Link to="following">
          Following {user.following.length ? user.following.length : 0}
        </Link>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items.userItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchItems: () => dispatch(actions.fetchLoggedUserItems()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileNavBar);
