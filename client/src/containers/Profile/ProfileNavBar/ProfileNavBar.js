import { use } from "passport";
import React from "react";
import { Link } from 'react-router-dom';
import classes from "./ProfileNavBar.module.css";

const ProfileNavBar = (props) => {
const user = props.userData
return (
    <ul className={classes.navContainer}>
       <li className={classes.listItem}><Link to='followers'><p>Followers {user.followers.length ? (user.followers.length) : 0}</p></Link></li> 
       <li className={classes.listItem}><Link to='following'>Following {user.following.length ? (user.following.length) : 0}</Link></li>
        <li className={classes.listItem}><Link to='items'>Items {user.gifts.length ? (user.gifts.length) : 0}</Link></li>
    </ul>
)
}

export default ProfileNavBar;