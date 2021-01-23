import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Profile
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/discover">Discover</NavigationItem>
    ) : null}
      <NavigationItem link="/logout">Logout</NavigationItem>
  </ul>
);

export default navigationItems;
