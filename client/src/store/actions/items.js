import axios from "axios";
import * as actionTypes from "./actionTypes";

export const resetItems = () => {
  return {
    type: actionTypes.RESET_ITEMS,
  };
};

export const addItemStart = () => {
  return {
    type: actionTypes.SAVE_ITEM_START,
  };
};

export const addItemSuccess = (response) => {
  console.log(response);
  return {
    type: actionTypes.SAVE_ITEM_SUCCESS,
    response: [response],
  };
};

export const addItemFailed = (error) => {
  return {
    type: actionTypes.SAVE_ITEM_FAILED,
    error: error,
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
      .post("/api/gift/add", { url })
      .then((response) => {
        dispatch(addItemSuccess[response.data]);
      })
      .catch((err) => {
        dispatch(addItemFailed(err));
      });
  };
};

export const removeItem = (id) => {
  return (dispatch) => {
    dispatch(removeItemStart());
    axios
      .delete(`/api/gifts/${id}`)
      .then((response) => {
        dispatch(removeItemSuccess(response.data));
      })
      .catch((err) => {
        dispatch(removeItemFailed(err));
      });
  };
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
      userItems: fetchedItems,
    });
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_ITEMS_FAILED });
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

