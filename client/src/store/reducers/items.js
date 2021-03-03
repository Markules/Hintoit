import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userItems: null,
  loading: false,
  error: null,
  isLiked: false,
  success: null,
};

const resetItem = (state, action) => {
  console.log("reset");
  return initialState;
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SAVE_ITEM_START:
    case actionTypes.REMOVE_ITEM_START:
    case actionTypes.FETCH_LOGGED_USER_ITEMS_START:
    case actionTypes.FETCH_ITEMS_START:
    case actionTypes.SHARE_ITEM_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.SAVE_ITEM_SUCCESS:
    case actionTypes.REMOVE_ITEM_SUCCESS:
    case actionTypes.SHARE_ITEM_SUCCESS:
    case actionTypes.LIKE_ITEM_SUCCESS:
    case actionTypes.UNLIKE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
      };

    case actionTypes.SAVE_ITEM_FAILED:
    case actionTypes.REMOVE_ITEM_FAILED:
    case actionTypes.LIKE_ITEM_FAILED:
    case actionTypes.UNLIKE_ITEM_FAILED:
    case actionTypes.SHARE_ITEM_FAILED:
    case actionTypes.FETCH_ITEM_FAILED:
    case actionTypes.FETCH_LOGGED_USER_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case actionTypes.FETCH_LOGGED_USER_ITEMS_SUCCESS:
    case actionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        userItems: payload,
        loading: false,
      }

    case actionTypes.RESET_ITEMS:
      return resetItem(state, action);

    default:
      return state;
  }
};

export default reducer;
