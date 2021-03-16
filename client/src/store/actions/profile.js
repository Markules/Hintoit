import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

// Fetch Logged user
export const fetchLoggedUser = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_LOGGED_USER_ITEMS_START });
  try {
    const res = await axios.get("/api/current_user");
    dispatch({
      type: actionTypes.FETCH_LOGGED_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_LOGGED_USER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get current user profile data
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
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PROFILE_START });
    const res = await axios.get(`/api/profile/${userId}`);

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/profile/create", formData);

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

// Get following users
export const getFollowingUsers = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/following/${id}`);

    dispatch({
      type: actionTypes.FETCH_FOLLOWING_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_FOLLOWING_USERS_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get followers users
export const getFollowersUsers = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/followers/${id}`);

    dispatch({
      type: actionTypes.FETCH_FOLLOWERS_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_FOLLOWERS_USERS_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
