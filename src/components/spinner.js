import React from 'react'
import cx from 'classnames'

const Container = ({ className, ...rest }) => (
  <span className={cx('spinner--container', className)} {...rest}>
    {rest.children}
  </span>
)

const SpinnerBall = ({ className, ...rest }) => (
  <span className={cx('spinner--ball', className)} {...rest}>
    {rest.children}
  </span>
)

const Spinner = ({ children, className }) => (
  <span className={cx('spinner', className)}>
    <Container>
      <SpinnerBall />
      <SpinnerBall />
      <SpinnerBall />
    </Container>
    {children}
  </span>
)

export default Spinner
