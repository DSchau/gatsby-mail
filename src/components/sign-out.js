import React from 'react'
import cx from 'classnames'
import { MdExitToApp } from 'react-icons/md'
import PropTypes from 'prop-types'

import Button from './button'

const SignoutButton = ({ className, ...rest }) => (
  <Button className={cx('sign-out', className)} {...rest}>
    {rest.children}
  </Button>
)

function Signout({ children, className, onClick, ...rest }) {
  return (
    <SignoutButton className={className} onClick={onClick} {...rest}>
      {children}
      <MdExitToApp className="exit" size={24} />
    </SignoutButton>
  )
}

Signout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Signout
