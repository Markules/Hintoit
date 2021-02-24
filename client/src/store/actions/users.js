import axios from "axios";
import { setAlert } from './alert';

import {
  FETCH_ALL_USERS_START,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILED,
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
    dispatch(setAlert( {payload: {msg: err} }, "danger" ));
  }
};
