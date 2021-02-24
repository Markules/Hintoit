import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAlert } from './alert'; 

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// Login user with google auth
export const auth = () => async (dispatch) => {
  dispatch({ type: actionTypes.AUTH_START });
  try {
    const res = await axios.get("/auth/google");
    dispatch({
      type: actionTypes.AUTH_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("userId", res.data._id);
  } catch (err) {
    dispatch({ type: actionTypes.AUTH_FAIL });
    dispatch(setAlert( err , "danger"));
  }
};

// Check if user is logged in with google auth
export const authCheckState = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  try {
    const token = res.data.userToken;
    if (!token) {
      dispatch(logout());
    } else {
      localStorage.setItem("token", token);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({ type: actionTypes.AUTH_FAIL });
  }
};
