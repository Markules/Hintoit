import React, { Fragment ,useState } from "react";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { connect } from "react-redux";
import { addItem, resetItem } from "../../../store/actions/items";
import { updateObject, checkValidity } from "../../../shared/utility";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

import classes from "./AddItem.module.css";

const AddItem = ({  addItem, history, loading, closed }) => {
  const [addItemForm, setAddItemForm] = useState({
    url: {
      elementType: "input",
      elementConfig: {
        type: "url",
        placeholder: "Enter URL (eg. https://www.website.com)",
      },
      value: "",
      validation: {
        required: true,
        isUrl: true,
      },
      valid: false,
      touched: false,
    },

    catagories: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Catagory (eg. Shirt, Birthday Gift, Amazon... )"
      },
      value: "",
      valid: false,
      touched: false,
    }
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

    addItem(addItemForm.url.value, addItemForm.catagories.value, history);
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
      placeholder={formElement.config.elementConfig.placeholder}
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

  return <Fragment>{spinner}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    error: state.items.error,
    success: state.items.success,
    loading: state.items.loading,
  };
};

export default connect(mapStateToProps, { addItem, resetItem })(withRouter(AddItem));
