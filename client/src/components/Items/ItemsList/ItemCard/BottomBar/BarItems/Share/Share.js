import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../../../../UI/Button/Button";
import * as actions from "../../../../.././../../store/actions";

import classes from "./Share.module.css";

const Share = (props) => {


  let shareButton = (
    <Link to={{
        pathname: "/share",
        state: {item: props.item}
    }}><Button
      clicked={() => handleShare()}
      btnType={"ShareButton"}
    >
      <i className={[classes.shareIcon, "material-icons"].join(" ")}>share</i>
    </Button></Link>
  );

  const handleShare = () => {
     
    //   props.shareItem(props.item.url);
  };

  return (
    <Fragment>
      <p>{shareButton}</p>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userItems: state.items.userItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareItem: (url) => dispatch(actions.shareItem(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
