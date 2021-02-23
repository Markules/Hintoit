import React, { useEffect } from "react";
import { connect } from "react-redux";
import Aux from "../../../../../hoc/Aux/Aux";
import * as actions from "../../../../../store/actions";
import Button from '../../../../UI/Button/Button';
import { history, withRouter } from 'react-router-dom';
import classes from "./ItemSettings.module.css";

const ItemSettings = (props) => {
  useEffect(() => {

  }, []);

    let settingBox = props.isSettingsOpen ?  (
      <ul key={props.item.id} className={classes.SettingsList}>
          <li className={classes.SettingsListItem}><Button btnType={"SettingsButton"}>EDIT</Button></li>
          <li className={classes.SettingsListItem}><Button clicked={() => props.removeItem(props.item._id, props.history)} btnType={"SettingsButton"}>DELETE</Button></li>
      </ul>
    ) : null;


  return (
    <Aux>
      {settingBox}
    </Aux>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id, history) => dispatch(actions.removeItem(id, history)),

  };
};

export default connect(null , mapDispatchToProps)(withRouter(ItemSettings));
