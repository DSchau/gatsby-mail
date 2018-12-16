import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import Button from './button'

function FloatingButton({
  as: Instance,
  children,
  className,
  disabled,
  to,
  type,
  onClick,
}) {
  const Component = Instance || Button
  return (
    <Component
      to={to}
      className={cx('button', 'button--floating', className)}
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
