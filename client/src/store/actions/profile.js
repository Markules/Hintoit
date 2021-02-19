import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchLoggedUserSuccess = (action) => {
  return {
    type: actionTypes.FETCH_LOGGED_USER_SUCCESS,
    userData: action,
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

export const fetchLoggedUser = () => {
  return (dispatch) => {
    dispatch(fetchLoggedUserStart);
    axios
      .get("/api/current_user")
      .then((response) => {
        dispatch(fetchLoggedUserSuccess(response.data));
        
      })
      .catch((err) => {
        dispatch(fetchLoggedUserFail(err));
      });
  };
};


