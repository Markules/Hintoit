import React, { Component } from "react";
import ItemsList from "../../components/Items/ItemsList/ItemsList";
import Aux from "../../hoc/Aux/Aux";

export class Discover extends Component {
  render() {
    const cardType = "discover";
    return (
      <Aux>
        Discover
        <ItemsList cardType={cardType} />
      </Aux>
    );
  }
}

export default Discover;
