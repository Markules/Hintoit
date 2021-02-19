import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = () => {
  return (dispatch) => {
    dispatch(authStart());
    let url = "/auth/google";
    axios
      .get(url)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data._id);
        dispatch(authSuccess(response.data.accessToken, response.data._id));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const setAuthRedircetPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    let url = "/api/current_user";
    axios.get(url)
    .then((response) => {
        const token = response.data.userToken;
        const userId = response.data.id;
        if (!token) {
            dispatch(logout());
          } else{
        localStorage.setItem('token', token )
        dispatch(authSuccess(token, userId));
          }
        })
        .catch((err) => {
            dispatch(authFail(err))
        });
    }
};
