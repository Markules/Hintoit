import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Input from '../../../../../../../UI/Input/Input';
import Button from "../../../../../../../UI/Button/Button";
import Spinner from '../../../../../../../UI/Spinner/Spinner';
import * as actions from "../../../../../.././../../store/actions";
import {
  updateObject,
  checkValidity,
} from "../../../../../../../../shared/utility";

import classes from "./ShareForm.module.css";

const ShareForm = (props) => {
  const [shareForm, setShareForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Recipient Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Recipient Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  let item = props.location.state.item.length !== 0 ?  props.location.state.item : null;

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(shareForm, {
      [controlName]: updateObject(shareForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          shareForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setShareForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.shareItem(shareForm.email.value, shareForm.name.value, item, props.history);
  };

  const formElementArray = [];
  for (let key in shareForm) {
    formElementArray.push({
      id: key,
      config: shareForm[key],
    });
  }

  let form = formElementArray.map((formElement) => (
    <Input
      inputClasses={'ShareInput'}
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

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let shareButton = <Button btnType={"SendButton"}>Send</Button>;

  return (
    <Fragment>
      <div className={classes.Container}>
        <h2 className={classes.Title}>Drop a hint to a friend</h2>
        {errorMessage}
        <form className={classes.Form} onSubmit={submitHandler}>
          {form}
          {shareButton}
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userItems: state.items.userItems,
    loading: state.items.loading,
    error: state.items.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareItem: (email, name, item, history) => dispatch(actions.shareItem(email, name, item, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShareForm));
