import * as actionTypes from "../actions/actionTypes";

const initalState = {
  idToken: null,
  userId: null,
  error: null,
  loading: null,
};

const reducer = (state = initalState, actions) => {

  const { type, payload } = actions;

  switch (type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
     
      return {
        ...state,
        idToken: payload.idToken,
        userId: payload.id,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        idToken: null,
        userId: null,
      };

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
