import React, { useState, useEffect } from "react";
import { previewLink } from "../../../../shared/utility";
import BottomBar from "./BottomBar/BottomBar";
import Button from "../../../UI/Button/Button";
import Moment from "react-moment";
import classes from "./ItemCard.module.css";
import ItemSettings from "./ItemSettings/ItemSettings";
import { Link } from "react-router-dom";

const ItemCard = ({ item, cardType }) => {
  const [isSettingsOpen, updateSettings] = useState(false);

  useEffect(() => {
    previewLink(item);
  }, [previewLink]);

  const handleItemSettings = () => {
    if (!isSettingsOpen) {
      updateSettings(true);
    } else {
      updateSettings(false);
    }
  };

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

  return item ? (
    <div key={item.id} className={classes.CardContainer}>
      <div>
        {cardType === "discover" ? (
          <Link to={`/user/${item._user._id}`}>
            <img
              src={item._user.avatar}
              alt=""
              className={classes.userAvatar}
            />
            <p className={classes.userName}>
              {item._user.firstName} {item._user.lastName}
            </p>
          </Link>
        ) : null}
        <span className={classes.Date}>
          Added{" "}
          <Moment ago={item.dateCreated} fromNow>
            {item.dateCreated}
          </Moment>{" "}
          ago
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
      {item.catagories &&
        item.catagories.map((catagory) =>
          catagory === " " ? null : (
            <span style={{backgroundColor: setColor()}} className={classes.Catagory}>{catagory}</span>
          )
        )}
      <BottomBar item={item} cardType={cardType} />
    </div>
  ) : null;
};

export default ItemCard;
