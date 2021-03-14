import React, { useState, useEffect } from "react";
import { previewLink } from "../../../../shared/utility";
import BottomBar from "./BottomBar/BottomBar";
import moment from "moment";
import Button from "../../../UI/Button/Button";

import classes from "./ItemCard.module.css";
import ItemSettings from "./ItemSettings/ItemSettings";
import { Link } from "react-router-dom";

const ItemCard = ({ item, cardType}) => {
  const [isSettingsOpen, updateSettings] = useState(false);


useEffect(() => {
  previewLink(item);
}, [previewLink])

  const handleItemSettings = () => {
    if (!isSettingsOpen) {
      updateSettings(true);
    } else {
      updateSettings(false);
    }
  };

  return item ? (
    <div key={item.id} className={classes.CardContainer}>
      <div>
        <Link to={`/user/${item._user._id}`}>
        <img src={item._user.avatar} alt="" className={classes.userAvatar}/>
        <p className={classes.userName}>{item._user.firstName} {item._user.lastName}</p>
        </Link>
        <span className={classes.Date}>
          {moment(item.dateCreated).format("MMM Do YYYY")}
        </span>
        {cardType === "discover" ? null : (
          <Button clicked={() => handleItemSettings()} btnType="ItemSettings">
            <i className={[classes.SettingsIcon, "material-icons"].join(" ")}>
              more_horiz
            </i>
          </Button>
        )}
      </div>

      <ItemSettings item={item} isSettingsOpen={isSettingsOpen} />
      <div className={classes.Preview}>{previewLink(item)}</div>
      <BottomBar item={item} cardType={cardType}/>
    </div>
  ) : null;
};


export default (ItemCard);
