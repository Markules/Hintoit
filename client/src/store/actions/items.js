import axios from "axios";
import * as actionTypes from "./actionTypes";

export const resetItems = () => {
  return {
    type: actionTypes.RESET_ITEMS,
  };
};

export const removeItemStart = () => {
  return {
    type: actionTypes.REMOVE_ITEM_START,
  };
};

export const removeItemSuccess = (item) => {
  return {
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    item: item,
  };
};

export const removeItemFailed = (error) => {
  return {
    type: actionTypes.REMOVE_ITEM_FAILED,
    error: error,
  };
};

export const shareItemStart = () => {
  return {
    type: actionTypes.SHARE_ITEM_START,
  };
};

export const shareItemSuccess = (data) => {
  return {
    type: actionTypes.SHARE_ITEM_SUCCESS,
    data: data,
  };
};

export const shareItemFailed = (error) => {
  return {
    type: actionTypes.SHARE_ITEM_FAILED,
    error: error,
  };
};

export const addItem = (url, history) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_ITEM_START });
  try {
    const res = axios.post("/api/gift/add", { url });
    dispatch({ type: actionTypes.ADD_ITEM_SUCCESS, payload: res.data });
    history.push("/login");
  } catch (err) {
    dispatch({ type: actionTypes.ADD_ITEM_FAILED, payload: err });
  }
};

export const removeItem = (id, history) => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_ITEM_START });
  try {
    const res = axios.delete(`/api/gifts/${id}`);
    dispatch({ type: actionTypes.REMOVE_ITEM_SUCCESS, payload: res.data });
    history.push("/login");
  } catch (err) {
    dispatch({ type: actionTypes.REMOVE_ITEM_FAILED, payload: err });
  }
};

export const shareItem = (email, name, item) => {
  return (dispatch) => {
    dispatch(shareItemStart());
    axios
      .post("/api/gift/share", { email, name, item })
      .then((response) => {
        dispatch(shareItemSuccess(response.data));
      })
      .catch((err) => {
        dispatch(shareItemFailed(err));
      });
  };
};

export const resetItem = () => {
  return (dispatch) => {
    dispatch(resetItems());
  };
};

export const fetchLoggedUserItems = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_LOGGED_USER_ITEMS_START });
  try {
    const res = await axios.get("/api/loggeduser/gifts");
    const fetchedItems = [];
    for (let key in res.data) {
      fetchedItems.push({
        ...res.data[key],
        id: key,
      });
    }
    dispatch({
      type: actionTypes.FETCH_LOGGED_USER_ITEMS_SUCCESS,
      payload: fetchedItems,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_LOGGED_USER_ITEMS_FAILED,
      payload: err,
    });
  }
};

// Fetch all items
export const fetchAllItems = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ITEMS_START });

  try {
    const res = await axios.get("/api/gifts");

    const fetchedItems = [];
    for (let key in res.data) {
      fetchedItems.push({
        ...res.data[key],
        id: key,
      });
    }
    dispatch({
      type: actionTypes.FETCH_ITEMS_SUCCESS,
      payload: fetchedItems,
    });
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_ITEMS_FAILED, payload: err });
  }
};

export const likeItem = (id) => async (dispatch) => {
  try {
    const res = axios.put(`/api/gifts/like/${id}`);
    dispatch({ type: actionTypes.LIKE_ITEM_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: actionTypes.LIKE_ITEM_FAILED, msg: err });
  }
};

export const unlikeItem = (id) => async (dispatch) => {
  try {
    const res = axios.put(`/api/gifts/unlike/${id}`);
    dispatch({ type: actionTypes.UNLIKE_ITEM_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: actionTypes.UNLIKE_ITEM_FAILED, msg: err });
  }
};
