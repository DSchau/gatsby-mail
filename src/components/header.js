import React from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Authentication from './authentication'
import { GatsbyLogo, ThemeToggle } from './icons'
import Signout from './sign-out'
import Theme from './theme'

import getZIndex from '../style/z-index'

const Container = styled.header(({ theme }) => ({
  flex: `0 0 auto`,
  display: `flex`,
  alignItems: `flex-end`,
  justifyContent: `space-between`,
  backgroundColor: theme.bg,
  color: theme.bg,
  padding: `1rem`,
  borderBottom: `1px solid ${theme.inverted.link}`,
  zIndex: getZIndex('header'),
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.color,
  fontSize: 24,
  textDecorationSkip: 'ink',
  textDecoration: 'none',
  ':hover': {
    color: theme.color,
    textDecoration: 'underline',
  },
}))

const IconButton = styled.button(
  {
    background: `none`,
    border: `none`,
    cursor: `pointer`,
  },
  props => ({
    color: props.theme.inverted.bg,
  })
)

const Header = ({ siteTitle }) => (
  <Theme>
    {({ toggleTheme, theme }) => (
      <Container>
        <h1 style={{ margin: 0 }}>
          <StyledLink to="/">
            <GatsbyLogo
              css={{ marginRight: '0.35rem', position: 'relative', top: 1 }}
            />
            {siteTitle
              .split('Gatsby')
              .pop()
              .trim()}
          </StyledLink>
        </h1>
        <div>
          <IconButton
            onClick={toggleTheme}
            title={`Switch to ${
              theme.name === 'dark' ? 'light' : 'dark'
            } theme`}
          >
            <ThemeToggle color={theme.link} size={20} />
          </IconButton>
          <Authentication>
            {({ authenticated, logout }) => (
              <>
                {authenticated ? (
                  <Signout
                    css={{ color: theme.link, position: 'relative', top: 3 }}
                    onClick={logout()}
                    title="Sign out"
                  />
                ) : null}
              </>
            )}
          </Authentication>
        </div>
      </Container>
    )}
  </Theme>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header
