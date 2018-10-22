import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import getZIndex from '../style/z-index'

const BUTTON_SIZE = 48

let Button = styled.button(({ disabled, theme }) => ({
  backgroundColor: theme.button,
  color: `white`,
  display: 'block',
  height: BUTTON_SIZE,
  width: BUTTON_SIZE,
  borderRadius: BUTTON_SIZE,
  fontSize: 24,
  textAlign: 'center',
  lineHeight: `${BUTTON_SIZE}px`,
  zIndex: getZIndex('button'),
  ...(disabled
    ? {
        backgroundColor: 'red',
      }
    : {}),
}))

function FloatingButton({ as, children, className, disabled, to, onClick }) {
  if (as) {
    Button = Button.withComponent(as)
  }
  return (
    <Button to={to} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  )
}

FloatingButton.propTypes = {
  as: PropTypes.any,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string,
}

FloatingButton.defaultProps = {
  disabled: false,
}

export default FloatingButton
