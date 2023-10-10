import * as types from "./types.user";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.USER_LOGIN_LOADING:
    case types.USER_REGISTER_LOADING:
      return { loading: true, isAuth: false };

    case types.USER_LOGIN_SUCCESS:
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
      };

    case types.USER_LOGIN_FAILED:
    case types.USER_REGISTER_FAILED:
      return {
        loading: false,
        isAuth: false,
        user : null,
        error: action.payload,
      };
      
    case types.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuth: false,
      };

      case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};