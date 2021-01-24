import * as actionTypes from "../../../../store/actions/actionTypes";
import { updateObject } from "../../../../shared/utility";

const initialState = {
  userData: null,
  loading: false,
  error: null,
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
  switch (action.type) {
    case actionTypes.FETCH_LOGGED_USER_START:
      return fetchLoggedUserStart(state, action);

    case actionTypes.FETCH_LOGGED_USER_SUCCESS:
      return fetchLoggedUserSuccess(state, action);

    case actionTypes.FETCH_LOGGED_USER_FAIL:
      return fetchLoggedUserFail(state, action);

    default:
      return state;
  }
};

export default reducer;
