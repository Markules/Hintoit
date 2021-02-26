import {
  FETCH_ALL_USERS_FAILED,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_START,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILED,
} from "../actions/actionTypes";

const initalState = {
  users: [],
  user: null,
  loading: null,
  error: {},
};

export default function (state = initalState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case FETCH_ALL_USERS_FAILED:
    case FOLLOW_USER_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case FETCH_ALL_USERS_SUCCESS:
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case FETCH_ALL_USERS_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
