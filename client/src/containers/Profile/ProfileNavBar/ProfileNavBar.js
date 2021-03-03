import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./ProfileNavBar.module.css";
import { fetchLoggedUserItems } from '../../../store/actions/items';

const ProfileNavBar = ({ fetchLoggedUserItems, userData}) => {
  

  useEffect(() => {
    fetchLoggedUserItems();
  }, [fetchLoggedUserItems]);

  const user = userData;

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


export default connect(null, { fetchLoggedUserItems })(ProfileNavBar);
