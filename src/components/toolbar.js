import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import BackLink from './back-link'

function Toolbar({ className }) {
  return (
    <div className={cx('toolbar', className)}>
      <BackLink to="/" title="Back to inbox">
        Inbox
      </BackLink>
    </div>
  )
}

Toolbar.propTypes = {
  className: PropTypes.string,
}

export default Toolbar
