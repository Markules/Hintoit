import React, { Fragment } from "react";
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className={classes.Title}>Page Not Found</h1>
      <p className={classes.Pargraph}> Sorry, this page does not exist</p>
    </Fragment>
  );
};

export default NotFound;
