import * as actionTypes from "../../../../store/actions/actionTypes";
import { updateObject } from "../../../../shared/utility";

const initialState = {
  userItems: null,
  loading: false,
  error: null,
};

const addItemStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addItemSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    item: action.item,
  });
};

const addItemFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
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
    case actionTypes.SAVE_ITEM_START:
      return addItemStart(state, action);

    case actionTypes.SAVE_ITEM_SUCCESS:
      return addItemSuccess(state, action);

    case actionTypes.SAVE_ITEM_FAILED:
      return addItemFailed(state, action);

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
