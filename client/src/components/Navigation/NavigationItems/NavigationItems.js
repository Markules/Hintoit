import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Profile
    </NavigationItem>

    <NavigationItem link="/discover">Discover</NavigationItem>

    <NavigationItem link="/logout">Logout</NavigationItem>
  </ul>
);

export default navigationItems;
