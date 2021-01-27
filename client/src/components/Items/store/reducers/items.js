import * as actionTypes from "../../../../store/actions/actionTypes";
import { updateObject } from "../../../../shared/utility";

const initialState = {
  userItems: null,
  loading: false,
  error: null,
  isLiked: false,
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

const likeItemSuccess = (state, action) => {
  return updateObject(state, {
    isLiked: true,
  });
};

const likeItemFailed = (state, action) => {
  return updateObject(state, {
    isLiked: false,
  });
};

const unlikeItemSuccess = (state, action) => {
  return updateObject(state, {
    isLiked: false,
  });
};

const unlikeItemFailed = (state, action) => {
  return updateObject(state, {
    isLiked: true,
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

    case actionTypes.LIKE_ITEM_SUCCESS:
      return likeItemSuccess(state, action);

    case actionTypes.LIKE_ITEM_FAILED:
      return likeItemFailed(state, action);

    case actionTypes.UNLIKE_ITEM_SUCCESS:
      return unlikeItemSuccess(state, action);

    case actionTypes.UNLIKE_ITEM_FAILED:
      return unlikeItemFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
