import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAlert } from './alert';

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

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};


// Create or update profile
export const createProfile = (formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile/create", formData, config);

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Profile Updated", "success"));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


