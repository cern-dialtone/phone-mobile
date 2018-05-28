import configureMockStore from 'redux-mock-store'
import {apiMiddleware} from 'redux-api-middleware'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {REACT_APP_AUTH_LOGIN_ENDPOINT} from '../settings'

import * as actions from './auth'

const middlewares = [thunk, apiMiddleware]
const mockStore = configureMockStore(middlewares)

describe('async auth actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should dispatch LOGIN_SUCCESS when login is called', () => {
    const authCode = '12345'
    const body = {
      login: true
    }
    expect(REACT_APP_AUTH_LOGIN_ENDPOINT).toEqual(`https://hostname/api/auth/login/`)
    console.debug(REACT_APP_AUTH_LOGIN_ENDPOINT)
    fetchMock.postOnce(`https://hostname/api/auth/login/`,
      {body: body, headers: {'content-type': 'application/json'}})
    const expectedActions = [
      {type: actions.LOGIN_REQUEST},
      {type: actions.LOGIN_SUCCESS, payload: body}
    ]
    const store = mockStore({})
    console.debug(REACT_APP_AUTH_LOGIN_ENDPOINT)
    return store.dispatch(actions.login(authCode)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should dispatch LOGOUT_SUCCESS when logout is called', () => {
    const body = {
      logout: true
    }
    fetchMock.deleteOnce(`https://hostname/api/auth/logout/`,
      {body: body, headers: {'content-type': 'application/json'}})
    const expectedActions = [
      {type: actions.LOGOUT_REQUEST},
      {type: actions.LOGOUT_SUCCESS, payload: body}
    ]
    const store = mockStore({})
    return store.dispatch(actions.logout()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should dispatch LOGOUT_SUCCESS when logout is called', () => {
    const body = {
      refresh: true
    }
    fetchMock.postOnce(`https://hostname/api/auth/refresh/`,
      {body: body, headers: {'content-type': 'application/json'}})
    const expectedActions = [
      {type: actions.TOKEN_REQUEST},
      {type: actions.TOKEN_RECEIVED, payload: body}
    ]
    const store = mockStore({})
    return store.dispatch(actions.refreshAccessToken()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
