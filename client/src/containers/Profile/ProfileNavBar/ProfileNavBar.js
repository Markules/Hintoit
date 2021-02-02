import { use } from "passport";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./ProfileNavBar.module.css";


const ProfileNavBar = (props) => {
  console.log("navbar", props.userData.gifts.length);
  const [itemsAmount, updateItemsAmount] = useState(
    props.userData.gifts.length
  );

  useEffect(() => {
    updateItemsAmount(props.userData.gifts.length);
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
      <li className={classes.listItem}>
        <Link to="items">Items {itemsAmount ? itemsAmount : 0}</Link>
      </li>
    </ul>
  );
};


export default ProfileNavBar;
