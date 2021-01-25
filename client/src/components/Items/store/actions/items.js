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

export const fetchLoggedUserItemsSuccess = (items) => {
  return {
    type: actionTypes.FETCH_LOGGED_USER_ITEMS_SUCCESS,
    userItems: items,
  };
};

export const fetchLoggedUserItemsFail = (error) => {
  return {
    type: actionTypes.FETCH_LOGGED_USER_FAIL,
    error: error,
  };
};

export const fetchLoggedUserItemsStart = () => {
  return {
    type: actionTypes.FETCH_LOGGED_USER_START,
  };
};

export const addItem = (url) => {
  return (dispatch) => {
    dispatch(addItemStart());
    axios
      .post("/api/gifts", url)
      .then((response) => {
        dispatch(addItemSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addItemFailed(err));
      });
  };
};

export const fetchLoggedUserItems = () => {
  return (dispatch) => {
    dispatch(fetchLoggedUserItemsStart);
    axios
      .get("/api/loggeduser/gifts")
      .then((response) => {
        
        const fetchedItems = [];
        for (let key in response.data) {
          fetchedItems.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchLoggedUserItemsSuccess(fetchedItems));
      })
      .catch((err) => {
        dispatch(fetchLoggedUserItemsFail(err));
      });
  };
};