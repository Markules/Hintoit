import * as actionTypes from "../../../../store/actions/actionTypes";
import { updateObject } from "../../../../shared/utility";

const initialState = {
  userData: [],
  loading: false,
  error: null,
  userItems: [],
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

const fetchLoggedUserItemsFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
  };
  
  const fetchLoggedUserItemsStart = (state, action) => {
    return updateObject(state, { loading: true });
  };
  
  const fetchLoggedUserItemsSuccess = (state, action) => {
    return updateObject(state, {
      userItems: action.userItems,
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

      case actionTypes.FETCH_LOGGED_USER_ITEMS_START:
        return fetchLoggedUserItemsStart(state, action);
  
      case actionTypes.FETCH_LOGGED_USER_ITEMS_SUCCESS:
        return fetchLoggedUserItemsSuccess(state, action);
  
      case actionTypes.FETCH_LOGGED_USER_ITEMS_FAILED:
        return fetchLoggedUserItemsFail(state, action);

    default:
      return state;
  }
};

export default reducer;
