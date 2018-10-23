import React from 'react'
import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'

import getZIndex from '../style/z-index'

const BUTTON_SIZE = 48

const buttonStyles = props =>
  css({
    alignItems: `center`,
    backgroundColor: props.theme.button,
    color: `white`,
    display: 'flex',
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE,
    fontSize: 28,
    textAlign: 'center',
    lineHeight: `${BUTTON_SIZE}px`,
    zIndex: getZIndex('button'),
    '& svg': {
      margin: `0 auto`,
    },
    ...(props.disabled
      ? {
          backgroundColor: 'red',
        }
      : {}),
  })

const Button = styled.button(buttonStyles)

function FloatingButton({
  as: Instance,
  children,
  className,
  disabled,
  to,
  type,
  onClick,
}) {
  const Component = Instance ? styled(Instance)(buttonStyles) : Button
  return (
    <Component
      to={to}
      className={className}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}

FloatingButton.propTypes = {
  as: PropTypes.any,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
}

FloatingButton.defaultProps = {
  disabled: false,
}

export default FloatingButton
