import React, { Component } from 'react'
import { ThemeProvider } from 'emotion-theming'

import { DARK, LIGHT } from '../style/theme'

const { Consumer, Provider } = React.createContext('theme')

const THEME_LS_KEY = '__gatsby_mail_theme_key__'

const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches === true

class Theme extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: this.getTheme(props.theme),
    }
  }

  componentDidMount() {
    const theme = localStorage.getItem(THEME_LS_KEY)
    if (theme) {
      this.setState({
        theme: this.getTheme(theme),
      })
    } else if (supportsDarkMode()) {
      this.setState({
        theme: this.getTheme('dark'),
      })
    }
  }

  getTheme(variant) {
    return {
      ...(variant === 'dark' ? DARK : LIGHT),
      inverted: variant === 'dark' ? LIGHT : DARK,
    }
  }

  toggleTheme = () => {
    this.setState(
      state => {
        const current = state.theme.name
        const theme = current === 'dark' ? 'light' : 'dark'
        return {
          theme: this.getTheme(theme),
        }
      },
      () => {
        localStorage.setItem(THEME_LS_KEY, this.state.theme.name)
      }
    )
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          toggleTheme: this.toggleTheme,
        }}
      >
        <ThemeProvider theme={this.state.theme}>
          {this.props.children}
        </ThemeProvider>
      </Provider>
    )
  }
}

Theme.Consumer = Consumer
Theme.Provider = Theme

export default Theme
