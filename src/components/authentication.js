import React from 'react'

import getAuth from '../util/authentication'

const { Consumer, Provider } = React.createContext(`authentication`)

const AUTH_SERVICE = 'gmail'

function Authentication({ children }) {
  return (
    <Provider
      value={{
        authenticated: false,
        // TODO: add login, logout, authenticated
      }}
    >
      {children}
    </Provider>
  )
}

Authentication.Provider = Authentication
Authentication.Consumer = Consumer

export default Authentication
