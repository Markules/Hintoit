import axios from "axios";
import * as actionTypes from "../../../../store/actions/actionTypes";

export const addItemStart = () => {
  return {
    type: actionTypes.SAVE_ITEM_START,
  };
};

export const addItemSuccess = (item) => {
  return {
    type: actionTypes.SAVE_ITEM_SUCCESS,
    item: item,
  };
};

export const addItemFailed = (error) => {
  return {
    type: actionTypes.SAVE_ITEM_FAILED,
    error: error,
  };
};


export const addItem = (url) => {
  return dispatch => {
      dispatch(addItemStart())
    axios.post("/api/gifts", url)
      .then(response => {
        dispatch(addItemSuccess(response.data));
      } )
      .catch(error => {
        dispatch(addItemFailed(error.response.data.error));
      });
  };
};
