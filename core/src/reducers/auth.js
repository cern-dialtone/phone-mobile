import * as authActions from '../actions/auth';
import { createError } from '../util/errors';

const initialState = {
  authInProgress: false,
  loggedIn: false,
  token: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  loginInProgress: false,
  requestingToken: false,
  error: null
};

/**
 * Reducer function for the authentication actions
 *
 * @param state Authentication state
 * @param action
 * @returns {{loggedIn, loginInProgress, error}}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_START:
      return {
        ...state,
        authInProgress: true,
        error: null
      };
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        loginInProgress: true,
        error: null
      };
    case authActions.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loginInProgress: false,
        authInProgress: false,
        error: createError(action)
      };
    case authActions.TOKEN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loginInProgress: false,
        authInProgress: false,
        requestingToken: false,
        token: undefined,
        error: createError(action)
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.payload.login,
        token: JSON.stringify(action.payload.token),
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        loginInProgress: false,
        authInProgress: false,
        error: null
      };
    case authActions.TOKEN_REQUEST:
      return {
        requestingToken: true,
        ...state
      };
    case authActions.TOKEN_RECEIVED:
      return {
        ...state,
        requestingToken: false,
        loggedIn: true,
        loginInProgress: false,
        authInProgress: false,
        error: {}
      };
    case authActions.LOGOUT_REQUEST:
      return {
        ...state,
        loggedIn: false,
        loginInProgress: false,
        authInProgress: false,
        token: undefined
      };
    case authActions.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false
      };
    case authActions.CLEAR_TOKEN:
      return {
        ...state,
        token: undefined,
        accessToken: undefined,
        refreshToken: undefined
      };
    default:
      return state;
  }
};
