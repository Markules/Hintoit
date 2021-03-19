import * as actionTypes from "../actions/actionTypes";

const initalState = {
  isAuthenticated: false,
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initalState, actions) => {

  const { type, payload } = actions;

  switch (type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
        isAuthenticated: null
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        idToken: payload.idToken,
        userId: payload.id,
        error: null,
        loading: false,
        isAuthenticated: true
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        isAuthenticated: false
      };
      
    case actionTypes.AUTH_LOGOUT:
      case actionTypes.ACCOUNT_DELETED:
      return {
        ...state,
        idToken: null,
        userId: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default reducer;
