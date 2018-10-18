import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'

import Authentication, {
  AuthenticationProvider,
} from '../components/authentication'
import Login from '../components/login'
import Content from '../components/content'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

import { DARK, LIGHT } from '../style/theme'

import '../style/global'
import 'normalize.css'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: `100%`,
})

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: this.getTheme(props.theme),
    }
  }

  getTheme(variant) {
    return {
      ...(variant === 'dark' ? DARK : LIGHT),
      inverted: variant === 'dark' ? LIGHT : DARK,
    }
  }

  toggleTheme = () => {
    this.setState(state => {
      const current = state.theme.name
      return {
        theme: this.getTheme(current === 'dark' ? 'light' : 'dark'),
      }
    })
  }

  render() {
    const { children, location, meta, title } = this.props
    const isCentered = [`/new`].includes(location.pathname)
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
                unauthenticatedRoutes
              }
            }
          }
        `}
        render={data => {
          const useAuthentication = !data.site.siteMetadata.unauthenticatedRoutes.includes(
            location.pathname
          )
          return (
            <ThemeProvider theme={this.state.theme}>
              <AuthenticationProvider>
                <Meta meta={meta} title={title} />
                <Container>
                  <Header
                    siteTitle={data.site.siteMetadata.title}
                    onThemeChange={this.toggleTheme}
                  />
                  {useAuthentication ? (
                    <Authentication>
                      {({ authenticated }) => (
                        <Content center={!authenticated || isCentered}>
                          {typeof authenticated !==
                          'boolean' ? null : authenticated === true ? (
                            children
                          ) : (
                            <Login />
                          )}
                        </Content>
                      )}
                    </Authentication>
                  ) : (
                    <Content>{children}</Content>
                  )}
                  <Footer />
                </Container>
              </AuthenticationProvider>
            </ThemeProvider>
          )
        }}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.array,
  theme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string,
}

Layout.defaultProps = {
  meta: [],
  theme: 'light',
}

export default Layout
