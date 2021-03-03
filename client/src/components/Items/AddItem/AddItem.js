import React, { useState, useEffect } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { connect } from "react-redux";
import { addItem, resetItem } from "../../../store/actions/items";
import { updateObject, checkValidity } from "../../../shared/utility";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

import classes from "./AddItem.module.css";

const AddItem = ({ resetItems ,resetItem, addItem, history, error, success, loading, closed }) => {
  const [addItemForm, setAddItemForm] = useState({
    url: {
      elementType: "input",
      elementConfig: {
        type: "url",
        placeholder: "Enter item url",
      },
      value: "",
      validation: {
        required: true,
        isUrl: true,
      },
      valid: false,
      touched: false,
    },
  });


  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(addItemForm, {
      [controlName]: updateObject(addItemForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          addItemForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAddItemForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    addItem(addItemForm.url.value, history);
  };

  const formElementArray = [];
  for (let key in addItemForm) {
    formElementArray.push({
      id: key,
      config: addItemForm[key],
    });
  }

  let form = formElementArray.map((formElement) => (
    <Input
      placeholder={"e.g. https://www.website.com"}
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  let spinner = loading ? (
    <div style={{ marginTop: "15%" }}>
      <Spinner />
    </div>
  ) : (
    <div>
      <form onSubmit={submitHandler} className={classes.AddItemForm}>
        <h1 className={classes.FormTitle}>ADD NEW ITEM</h1>
  
        {form}
        <br></br>

        <Button type="submit" btnType="Submit" ButtonContent={"SubmitContent"}>
          SUBMIT
        </Button>
      </form>
      <Button
        clicked={closed}
        btnType="Cancel"
        ButtonContent={"CancelContent"}
      >
        CANCEL
      </Button>
    </div>
  );

  return <Aux>{spinner}</Aux>;
};

const mapStateToProps = (state) => {
  return {
    error: state.items.error,
    success: state.items.success,
    loading: state.items.loading,
  };
};

export default connect(mapStateToProps, { addItem, resetItem })(withRouter(AddItem));
