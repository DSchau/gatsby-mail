import React from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'
import { FaLightbulb } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Container = styled.header(({ theme }) => ({
  flex: `0 0 auto`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  backgroundColor: theme.accent,
  color: theme.bg,
  padding: `1rem 0.5rem`,
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: `white`,
  fontFamily: `sans-serif`,
  fontSize: 24,
  textDecorationSkip: 'ink',
  ':hover': {
    color: 'white',
    textDecoration: 'underline',
  },
}))

const IconButton = styled.button(
  {
    background: `none`,
    border: `none`,
    cursor: `pointer`,
    fontSize: 24,
  },
  props => ({
    color: props.theme.inverted.bg,
  })
)

const Header = ({ onThemeChange, siteTitle }) => (
  <Container>
    <h1 style={{ margin: 0 }}>
      <StyledLink to="/">{siteTitle}</StyledLink>
    </h1>
    <IconButton onClick={onThemeChange}>
      <FaLightbulb />
    </IconButton>
  </Container>
)

Header.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
}

export default Header
