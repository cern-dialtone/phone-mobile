import configureMockStore from 'redux-mock-store'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from 'src/actions/user/me'

const middlewares = [ thunk, apiMiddleware ]
const mockStore = configureMockStore(middlewares)

describe('async me actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should dispatch ME_SUCCESS when getMe is called', () => {
    const body = {
      firstName: 'DIVISION',
      lastName: 'GROUP',
      phone: 'SECTION',
      mobile: 'NAME',
      email: 'EMAIL',
      username: 'USERNAME'
    }
    fetchMock.getOnce(`https://hostname/api/users/me/`,
      {body: body, headers: {'content-type': 'application/json'}})
    const expectedActions = [
      {type: actions.ME_REQUEST},
      {type: actions.ME_SUCCESS, payload: body}
    ]
    const store = mockStore({auth: {access: {token: '12345'}}})
    return store.dispatch(actions.getMe()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})