import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./CatagoryContainer.module.css";

const CatagoryContainer = ({ catagories, setQuery }) => {
  const setColor = () => {
    let color =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    return color;
  };

  return (
    <Fragment>
      {catagories.map((catagory) =>
        catagory === " " || catagory === null ? null : (
            <span
            key={catagory}
            style={{ backgroundColor: setColor() }}
            className={classes.Catagory}
            onClick={() => setQuery(catagory)}
          >
            {catagory}
          </span>
        )
      )}
      
    </Fragment>
  );
};

CatagoryContainer.propTypes = {
  catagories: PropTypes.array.isRequired,
};

export default CatagoryContainer;
