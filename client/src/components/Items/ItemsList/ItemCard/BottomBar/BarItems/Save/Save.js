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
  }, [props.userItems, props.item.url]);

    let SaveButton = save ?  (
      <Button clicked={() => handleSave()}  btnType={"saveButton"}>
        <i className={[classes.savedIcon, "material-icons"].join(" ")}>
          bookmark
        </i>
      </Button>
    ) : (
      <Button clicked={() => handleSave()} btnType={"unsaveButton"}>
        <i className={[classes.unsavedIcon, "material-icons"].join(" ")}>
        bookmark_border
        </i>
      </Button>
    );

  const handleSave = () => {
      props.saveItem(props.item.url); 
      updateSave(true) 
  };

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
    saveItem: (url) => dispatch(actions.addItem(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Save);
