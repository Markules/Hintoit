import axios from "axios";
import { setAlert } from "./alert";
import {getFollowingUsers, getFollowersUsers} from './profile'

import {
  FETCH_ALL_USERS_START,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILED,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILED,
  UNFOLLOW_USER_FAILED,
  UNFOLLOW_USER_SUCCESS
} from "./actionTypes";

export const fetchAllUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USERS_START });
  try {
    const res = await axios.get("/api/users");
    dispatch({ type: FETCH_ALL_USERS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_ALL_USERS_FAILED,
      payload: { msg: err },
    });
    dispatch(setAlert({ payload: { msg: err } }, "danger"));
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/users/follow/${id}`);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FOLLOW_USER_FAILED, payload: { msg: err } });
    dispatch(setAlert("FOLLOW FAILED", "danger"));
  }
};

export const unFollowUser = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/users/unfollow/${id}`);
    dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: UNFOLLOW_USER_FAILED, payload: { msg: err } });
    dispatch(setAlert("UNFOLLOW FAILED", "danger"));
  }
};
