import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editItem, getItem } from "../../../../store/actions/items";
import Button from "../../../UI/Button/Button";
import Spinner from "../../../UI/Spinner/Spinner";

import classes from "./EditItem.module.css";

const initalState = {
  url: "",
  catagories: "",
}

const EditItem = ({ items: { loading }, getItem, editItem, match, location: { state } }) => {
    
  const [formData, setFormData] = useState(initalState);

  useEffect(() => {
   getItem(match.params.id);
   
    setFormData({
      url: loading || !state.url ? "" : state.url,
      catagories: loading || !state.catagories ? "" : state.catagories,
  }) 
  }, [ getItem]);

  const { url, catagories } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editItem(match.params.id, formData);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={classes.Header}>
            <h1 className={classes.Title}>Edit Item</h1>
          </div>
          <form className={classes.Form} onSubmit={(e) => onSubmit(e)}>
            <div className={classes.FormContainer}>
              <input
                className={classes.Input}
                type="text"
                placeholder="url"
                name="url"
                value={url}
                onChange={(e) => onChange(e)}
              />
              <div className={classes.TextContainer}>
                <small className={classes.FormText}>
                  Could be your own or a company website
                </small>
              </div>

              <div className="form-group">
                <input
                  className={classes.Input}
                  type="text"
                  placeholder="catagory"
                  name="catagories"
                  value={catagories}
                  onChange={(e) => onChange(e)}
                />
                <div className={classes.TextContainer}>
                  {" "}
                  <small className={classes.FormText}>
                    Catagory suggested (eg. Shirt, My Birthday Gifts)
                  </small>
                </div>
              </div>
            </div>
            <div className={classes.ButtonContainer}>
              <Button
                type="submit"
                className={classes.Button}
                btnType={"EditSubmit"}
              >
                SAVE
              </Button>
            </div>
            <div className={classes.LinkContainer}>
              <Link to={"/"} className={classes.Link}>
                Go Back
              </Link>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

EditItem.propTypes = {
  item: PropTypes.object.isRequired,
  getItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getItem, editItem })(EditItem);
