import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setAlert } from "./alert";

// Add Item
export const addItem = (url, catagories , history) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_ITEM_START });
  try {
    const res = axios.post("/api/gift/add", { url, catagories });
    dispatch({ type: actionTypes.ADD_ITEM_SUCCESS, payload: res.data });
    dispatch(setAlert("Item Added", "success"));
    history.push("/login");
  } catch (err) {
    dispatch({ type: actionTypes.ADD_ITEM_FAILED, payload: err });
  }
};

// Edit Item
export const editItem = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_ITEM_START });

    const res = axios.patch(`/api/gifts/${id}`, formData);
    dispatch({ type: actionTypes.EDIT_ITEM_SUCCESS, payload: res.data });
    dispatch(setAlert("Item Updated", "success"));
  } catch (err) {
    dispatch({ type: actionTypes.EDIT_ITEM_FAILED, payload: err });
    dispatch(setAlert("Something went wrong", "danger"));
  }
};

// Remove Item
export const removeItem = (id, history) => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_ITEM_START });
  try {
    axios.delete(`/api/gifts/${id}`);
    dispatch({ type: actionTypes.REMOVE_ITEM_SUCCESS, payload: id });
    dispatch(fetchLoggedUserItems());
    history.push("/login");
    dispatch(setAlert("Item Removed", "success"));
  } catch (err) {
    dispatch({
      type: actionTypes.REMOVE_ITEM_FAILED,
      payload: {
        msg: err.statusText,
        status: err.status,
      },
    });

    dispatch(setAlert("Something went wrong", "danger"));
  }
};

// Share Item
export const shareItem = (email, name, item, history) => async (dispatch) => {
  dispatch({ type: actionTypes.SHARE_ITEM_START });
  try {
    const res = axios.post("/api/gift/share", { email, name, item });
    dispatch({ type: actionTypes.SHARE_ITEM_SUCCESS, payload: res.data });
    dispatch(setAlert("Item Sent", "success"));
    history.push("/");
  } catch (err) {
    dispatch({ type: actionTypes.SHARE_ITEM_FAILED, payload: err });
  }
};

// Reset Items
export const resetItem = (dispatch) => {
  dispatch({ type: actionTypes.RESET_ITEMS });
};

// Fetch logged user items
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
    dispatch(setAlert(err, "danger"));
  }
};

// Fetch items by user id
export const fetchItemsByUserId = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ITEMS_START });
  try {
    const res = await axios.get(`/api/user/gifts/${id}`);
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
    dispatch({
      type: actionTypes.FETCH_ITEMS_FAILED,
      payload: err,
    });
    dispatch(setAlert(err, "danger"));
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
    dispatch(setAlert(err, "danger"));
  }
};

// Like item
export const likeItem = (id) => async (dispatch) => {
  try {
    const res = axios.put(`/api/gifts/like/${id}`);
    dispatch({ type: actionTypes.LIKE_ITEM_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: actionTypes.LIKE_ITEM_FAILED, msg: err });
  }
};

// Unlike Item
export const unlikeItem = (id) => async (dispatch) => {
  try {
    const res = axios.put(`/api/gifts/unlike/${id}`);
    dispatch({ type: actionTypes.UNLIKE_ITEM_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: actionTypes.UNLIKE_ITEM_FAILED, msg: err });
  }
};

// Get item by id
export const getItem = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ITEM_START });
  try {
    const res = await axios.get(`/api/gift/${id}`);
    dispatch({
      type: actionTypes.FETCH_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_ITEM_FAILED,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

// Add comment
export const addComment = (itemId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/gift/comment/${itemId}`,
      formData,
      config
    );
    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: actionTypes.ADD_COMMENT_FAILED,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

// Delete comment
export const deleteComment = (itemId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/gift/comment/${itemId}/${commentId}`);
    dispatch({
      type: actionTypes.REMOVE_COMMENT,
      payload: res.data,
    });
    dispatch(getItem(itemId));

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: actionTypes.REMOVE_COMMENT_FAILED,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
