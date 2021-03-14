import React, { Fragment  } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../../store/actions";
import Button from '../../../../UI/Button/Button';
import { Link, withRouter } from 'react-router-dom';
import classes from "./ItemSettings.module.css";

const ItemSettings = (props) => {

    let settingBox = props.isSettingsOpen ?  (
      <ul key={props.item.id} className={classes.SettingsList}>
          <li className={classes.SettingsListItem}><Link to={`/items/edit/${props.item._id}`}><Button btnType={"SettingsButton"}>EDIT</Button></Link></li>
          <li className={classes.SettingsListItem}><Button clicked={() => props.removeItem(props.item._id, props.history)} btnType={"SettingsButton"}>DELETE</Button></li>
      </ul>
    ) : null;


  return (
    <Fragment>
      {settingBox}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id, history) => dispatch(actions.removeItem(id, history)),
  };
};

export default connect(null , mapDispatchToProps)(withRouter(ItemSettings));
