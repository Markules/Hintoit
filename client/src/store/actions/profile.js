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


// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
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

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/");
    }
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


