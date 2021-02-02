import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Aux from "../../../../../hoc/Aux/Aux";
import * as actions from "../../../../../store/actions";
import Button from '../../../../UI/Button/Button';

import classes from "./ItemSettings.module.css";


const ItemSettings = (props) => {
console.log( 'settings',props.item._id)
  useEffect(() => {

  }, []);

    let settingBox = props.isSettingsOpen ?  (
      <ul className={classes.SettingsList}>
          <li className={classes.SettingsListItem}><Button btnType={"SettingsButton"}>EDIT</Button></li>
          <li className={classes.SettingsListItem}><Button clicked={() => props.removeItem(props.item._id)} btnType={"SettingsButton"}>DELETE</Button></li>
      </ul>
    ) : null;


  return (
    <Aux>
      {settingBox}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => dispatch(actions.removeItem(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSettings);
