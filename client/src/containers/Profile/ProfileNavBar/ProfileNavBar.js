import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./ProfileNavBar.module.css";

const ProfileNavBar = ({ userData}) => {
  const user = userData;
  return (
    <ul className={classes.navContainer}>
      <li className={classes.listItem}>
        <Link to={{
          pathname:"/followers",
          state: user.id
          }}>
          <p>Followers {user.followers.length ? user.followers.length : 0}</p>
        </Link>
      </li>
      <li className={classes.listItem}>
        <Link to= {{
          pathname:"following",
          state: user.id
          }}>
          Following {user.following.length ? user.following.length : 0}
        </Link>
      </li>
    </ul>
  );
};


export default connect(null, { })(ProfileNavBar);
