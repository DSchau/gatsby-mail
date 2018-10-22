import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'react-emotion'

import Authentication from '../components/authentication'
import Login from '../components/login'
import Content from '../components/content'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Theme from '../components/theme'

import '../style/global'
import 'normalize.css'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: `100%`,
})

class Layout extends Component {
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
            <Theme.Provider>
              <Authentication.Provider>
                <Meta meta={meta} title={title} />
                <Container>
                  <Header siteTitle={data.site.siteMetadata.title} />
                  {useAuthentication ? (
                    <Authentication>
                      {({ authenticated }) => (
                        <Content
                          center={!authenticated || isCentered}
                          decoration={useAuthentication}
                        >
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
                    <Content decoration={true}>{children}</Content>
                  )}
                  <Footer stripes={location.pathname === `/`} />
                </Container>
              </Authentication.Provider>
            </Theme.Provider>
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
