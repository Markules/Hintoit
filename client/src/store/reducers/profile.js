import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  userData: null,
  loading: false,
  error: null,
  profile: null,
  profiles: [],
  following: [],
  followers: [],
};

const fetchLoggedUserFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchLoggedUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchLoggedUserSuccess = (state, action) => {
  return updateObject(state, {
    userData: action.userData,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.FETCH_LOGGED_USER_START:
      return fetchLoggedUserStart(state, action);

    case actionTypes.FETCH_LOGGED_USER_SUCCESS:
      return fetchLoggedUserSuccess(state, action);

    case actionTypes.FETCH_LOGGED_USER_FAIL:
      return fetchLoggedUserFail(state, action);

    case actionTypes.GET_PROFILE_START:
      return {
        ...state,
        profile: null,
        proifles: [],
        loading: true,
      };

    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case actionTypes.PROFILE_ERROR:
    case actionTypes.FETCH_FOLLOWERS_USERS_FAILED:
    case actionTypes.FETCH_FOLLOWING_USERS_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };

    case actionTypes.FETCH_FOLLOWING_USERS:
      return {
        ...state,
        following: payload,
        loading: false,
      };

    case actionTypes.FETCH_FOLLOWERS_USERS:
      return {
        ...state,
        followers: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
