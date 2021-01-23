import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import useForm from "../../../hooks/useCustomForm";
import Button from "../../UI/Button/Button"
import { connect } from "react-redux";
import * as actions from "../store/actions/items";
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect, Link } from "react-router-dom";

import classes from "./AddItem.module.css";

const AddItem = (props) => {
  const initialValues = {
    url: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit: (url) => addItemHandler(url),
  });

  

  React.useEffect(() => {
    if (props.success) {
      return props.closed;
    }
  }, []);

  const addItemHandler = (url) => {
    props.addItem(url);
  };

  let errorMessage = props.error ? (
    <p className={classes.errorMessage}>Something went wrong</p>
  ) : null;

  let spinner = props.loading ? (
    <div style={{ marginTop: "15%" }}>
      <Spinner />
    </div>
  ) : (
    <div>

      <form onSubmit={handleSubmit} className={classes.AddItemForm}>
        <h1 className={classes.FormTitle}>ADD NEW ITEM</h1>
        
        {errorMessage}
        <input
          className={classes.Input}
          type="text"
          name="url"
          onChange={handleChange}
          value={values.url}
          placeholder="Enter URL.."
        />
        <br></br>


        <Button 
        type="submit"
        btnType="Submit"
        ButtonContent={"SubmitContent"}>
          SUBMIT
        </Button>
      </form>
      <Button
          clicked={props.closed}
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
    success: state.items.itemUrl,
    loading: state.items.loading,
    redirectPath: state.items.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (url) => dispatch(actions.addItem(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
