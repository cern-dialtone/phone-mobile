import * as TEST_CONFIG from './config.testing'

let REACT_APP_AUTH_LOGIN_ENDPOINT
let REACT_APP_AUTH_LOGOUT_ENDPOINT
let REACT_APP_AUTH_REFRESH_ENDPOINT

if (process.env.NODE_ENV === 'test') {
  REACT_APP_AUTH_LOGIN_ENDPOINT = TEST_CONFIG.REACT_APP_AUTH_LOGIN_ENDPOINT
  REACT_APP_AUTH_LOGOUT_ENDPOINT = TEST_CONFIG.REACT_APP_AUTH_LOGOUT_ENDPOINT
  REACT_APP_AUTH_REFRESH_ENDPOINT = TEST_CONFIG.REACT_APP_AUTH_REFRESH_ENDPOINT
} else if (process.env.NODE_ENV === 'development') {
  REACT_APP_AUTH_LOGIN_ENDPOINT = ''
  REACT_APP_AUTH_LOGOUT_ENDPOINT = ''
  REACT_APP_AUTH_REFRESH_ENDPOINT = ''
}

export {
  REACT_APP_AUTH_LOGIN_ENDPOINT,
  REACT_APP_AUTH_LOGOUT_ENDPOINT,
  REACT_APP_AUTH_REFRESH_ENDPOINT
}