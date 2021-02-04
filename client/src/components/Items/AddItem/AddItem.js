import React, { useState, useEffect } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Input from '../../UI/Input/Input';
import Button from "../../UI/Button/Button"
import { connect } from "react-redux";
import * as actions from "../store/actions/items";
import { updateObject, checkValidity } from "../../../shared/utility";
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect, Link } from "react-router-dom";

import classes from "./AddItem.module.css";
import Modal from "../../UI/Modal/Modal";

const AddItem = (props) => {
  const [addItemForm, setAddItemForm] = useState({
    url: {
      elementType: "input",
      elementConfig: {
        type: "url",
        placeholder: "Enter Url",
      },
      value: "",
      validation: {
        required: true,
        isUrl: true,
      },
      valid: false,
      touched: false,
    }
  })

  useEffect(() => {
    if (props.success !==  null) {

   
    }
  }, []);

  const inputChangedHandler = ( event, controlName ) => {
    const updatedControls = updateObject( addItemForm, {
        [controlName]: updateObject( addItemForm[controlName], {
            value: event.target.value,
            valid: checkValidity( event.target.value, addItemForm[controlName].validation ),
            touched: true
        } )
    } );
    setAddItemForm(updatedControls);
}

const submitHandler = (event) => {
  event.preventDefault();
   props.addItem(addItemForm.url.value);
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

const onCancelHandler = () => {
  return props.closed,
  props.reset();
  
   
} 

  let errorMessage = props.error ? (
    <p className={classes.ErrorMessage}>Something went wrong</p>
  ) : null;

  let successMessage = props.success ? (
    <p className={classes.SuccessMessage}>{props.success}</p>
  ) : null;

  let spinner = props.loading ? (
    <div style={{ marginTop: "15%" }}>
      <Spinner />
    </div>
  ) : (
    <div>
      
      <form onSubmit={submitHandler} className={classes.AddItemForm}>
        <h1 className={classes.FormTitle}>ADD NEW ITEM</h1>
        {successMessage}
        {errorMessage}
        {form}
        <br></br>


        <Button 
        type="submit"
        btnType="Submit"
        ButtonContent={"SubmitContent"}>
          SUBMIT
        </Button>
      </form>
      <Button
          clicked={() => onCancelHandler()}
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
    redirectPath: state.items.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (url) => dispatch(actions.addItem(url)),
    reset: () => dispatch(actions.resetItem())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
