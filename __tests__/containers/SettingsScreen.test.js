import React from 'react'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import SettingsScreen from 'src/containers/screens/SettingsScreen'

describe('SettingsScreen', () => {
  const storeContent = {
    auth: {
      access: {
        token: '12345'
      },
      refresh: {
        token: '12345'
      }
    }
  }

  it('should render successfully if string is not provided by store', () => {
    const mockStore = configureMockStore({})
    const store = mockStore(storeContent)
    const props = {
      logout: jest.fn(),
      isAuthenticated: false,
      store: store
    }
    const rendered = renderer.create(<SettingsScreen {...props} />).toJSON()
    expect(rendered).toBeTruthy()
  })
})