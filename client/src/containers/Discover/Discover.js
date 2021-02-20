import React, { Component } from "react";
import ItemsList from "../../components/Items/ItemsList/ItemsList";
import UsersList from "../../components/Users/UsersList/UsersList";
import Aux from "../../hoc/Aux/Aux";

import classes from "./Discover.module.css";

export class Discover extends Component {
  state = {
    list: "items",
    itemActive: true,
    UsersActive: false
  };

  render() {
    const cardType = "discover";
    let listType =
      this.state.list === "items" ? (
        <ItemsList cardType={cardType} />
      ) : (
        <UsersList />
      );

    const onChangeItemsList = () => {
      this.setState({ list: "items", itemActive: true, UsersActive: false });
    };

    const onChangeUsersList = () => {
      this.setState({ list: "users", itemActive: false, UsersActive: true });
    };

    return (
      <Aux>
        <div className={classes.ListTypeContainer}>
          <ul className={classes.ListTypes}>
            <li
              className={[classes.Type, classes.ItemsType, this.state.itemActive ? classes.ItemActive : null].join(" ")}
              onClick={() => onChangeItemsList()}
            >
              ITEMS
            </li>
            <li
              className={[classes.Type, classes.UsersType, this.state.UsersActive ? classes.UsersActive : null].join(" ")}
              onClick={() => onChangeUsersList()}
            >
              USERS
            </li>
          </ul>
        </div>
        {listType}
      </Aux>
    );
  }
}

export default Discover;
