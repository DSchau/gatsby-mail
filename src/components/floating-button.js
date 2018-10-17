import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

let Link = styled.button(({ theme }) => ({
  backgroundColor: theme.accent,
  color: theme.bg,
  padding: '1rem',
  minHeight: 48,
  minWidth: 48,
  borderRadius: 48,
}))

function FloatingButton({ as, children, to, onClick }) {
  if (as) {
    Link = Link.withComponent(as)
  }
  return (
    <Link to={to} onClick={onClick}>
      {children}
    </Link>
  )
}

FloatingButton.propTypes = {
  as: PropTypes.any,
  children: PropTypes.node,
  onClick: PropTypes.func,
  to: PropTypes.string,
}

export default FloatingButton
