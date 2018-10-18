import React, { Component } from 'react'
import getAuth from '../util/authentication'

const { Provider, Consumer } = React.createContext(`authentication`)

export class AuthenticationProvider extends Component {
  state = {}
  auth = undefined

  async componentDidMount() {
    this.auth = getAuth()

    const authenticated = await this.auth.isLoggedIn('gmail')

    this.setState({
      authenticated,
    })
  }

  login = (service = 'gmail') => {
    return async () => {
      await this.auth.login(service)

      const authenticated = await this.auth.isLoggedIn(service)

      this.setState({
        authenticated,
      })
    }
  }

  logout = (service = 'gmail') => {
    return async () => {
      await this.auth.logout(service)

      this.setState({
        authenticated: false,
      })
    }
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

Consumer.Provider = AuthenticationProvider

export default Consumer
