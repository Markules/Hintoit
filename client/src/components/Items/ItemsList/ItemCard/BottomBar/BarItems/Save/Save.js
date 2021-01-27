import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Aux from "../../../../../../../hoc/Aux/Aux";
import Button from "../../../../../../UI/Button/Button";
import * as actions from "../../../../.././../../store/actions";

import classes from "./Save.module.css";


const Save = (props) => {
  const [save, updateSave] = useState(false);

  useEffect(() => {
    [...props.userItems.includes(props.item.url)]
      ? updateSave(true)
      : updateSave(false);
  }, []);

    let SaveButton = save ?  (
      <Button btnType={"saveButton"}>
        <i className={[classes.savedIcon, "material-icons"].join(" ")}>
          content_copy
        </i>
      </Button>
    ) : (
      <Button btnType={"unsaveButton"}>
        <i className={[classes.unsavedIcon, "material-icons"].join(" ")}>
        content_copy
        </i>
      </Button>
    );
  console.log(...props.userItems);
  const handleSave = () => {};

  return (
    <Aux>
      <p>{SaveButton}</p>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    userItems: state.items.userItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    like: (itemId) => dispatch(actions.likeItem(itemId)),
    // unlike: (itemId) => dispatch(actions.unlikeItem(itemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Save);
