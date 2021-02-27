import React, { useState } from "react";
import { connect } from "react-redux";
import { previewLink } from "../../../../shared/utility";
import BottomBar from "./BottomBar/BottomBar";
import moment from "moment";
import Button from "../../../UI/Button/Button";

import classes from "./ItemCard.module.css";
import ItemSettings from "./ItemSettings/ItemSettings";

const ItemCard = (props) => {
  const [isSettingsOpen, updateSettings] = useState(false);

  const handleItemSettings = () => {
    if (!isSettingsOpen) {
      updateSettings(true);
    } else {
      updateSettings(false);
    }
  };

  return props.item ? (
    <div key={props.item.id} className={classes.CardContainer}>
      <div>
        <span className={classes.Date}>
          {moment(props.item.dateCreated).format("MMM Do YYYY")}
        </span>
        {props.cardType === "discover" ? null : (
          <Button clicked={handleItemSettings} btnType="ItemSettings">
            <i className={[classes.SettingsIcon, "material-icons"].join(" ")}>
              more_horiz
            </i>
          </Button>
        )}
      </div>

      <ItemSettings item={props.item} isSettingsOpen={isSettingsOpen} />
      <div className={classes.Preview}>{previewLink(props.item)}</div>
      <BottomBar item={props.item} cardType={props.cardType}/>
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
