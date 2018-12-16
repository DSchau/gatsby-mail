import React from 'react'
import cx from 'classnames'

export default ({ className, children, ...rest }) => (
  <button className={cx('button', className)} {...rest}>
    {children}
  </button>
)
