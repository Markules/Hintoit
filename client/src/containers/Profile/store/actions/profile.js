import * as actionTypes from "../../../../store/actions/actionTypes";
import axios from "axios";

export const fetchLoggedUserSuccess = (action) => {
  return {
    type: actionTypes.FETCH_LOGGED_USER_SUCCESS,
    userData: action.data,
  };
};

export const fetchLoggedUserFail = (error) => {
  return {
    type: actionTypes.FETCH_LOGGED_USER_FAIL,
    error: error,
  };
};

export const fetchLoggedUserStart = () => {
  return {
    type: actionTypes.FETCH_LOGGED_USER_START,
  };
};


export const fetchLoggedUserItemsSuccess = (action) => {
    return {
      type: actionTypes.FETCH_LOGGED_USER_SUCCESS,
      userData: action.data,
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

export const fetchLoggedUser = () => {
  return (dispatch) => {
    dispatch(fetchLoggedUserStart);
    axios
      .get("/api/current_user")
      .then((response) => {
        dispatch(fetchLoggedUserSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchLoggedUserFail(err.response.data.error));
      });
  };
};

export const fetchLoggedUserItems = () => {
    return (dispatch) => {
      dispatch(fetchLoggedUserItemsStart);
      axios
        .get("/api/loggeduser/gifts")
        .then((response) => {
          dispatch(fetchLoggedUserItemsSuccess([response.data]));
        })
        .catch((err) => {
          dispatch(fetchLoggedUserItemsFail(err.response.data.error));
        });
    };
  };
