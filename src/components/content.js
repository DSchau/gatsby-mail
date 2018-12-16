import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { Star } from './icons'

function Content({ children, center, decoration }) {
  const starProps = {
    className: cx('star', 'star--fixed'),
    width: 180,
    height: 180,
  }

  return (
    <main className={cx('content', center && 'content--centered')}>
      {decoration && (
        <div css={{ zIndex: 0 }}>
          <Star
            style={{ bottom: -45, left: -90 }}
            fill="#FFDF37"
            {...starProps}
          />
          <Star
            style={{ bottom: '25vh', right: -90 }}
            fill="#73FFF7"
            {...starProps}
          />
          <Star
            style={{ top: '25vh', left: -20 }}
            size={40}
            fill="#3FA9F5"
            {...starProps}
          />
          <Star
            style={{ top: '12.5vh', left: '15vw' }}
            size={14}
            fill="#663399"
            {...starProps}
          />
          <Star
            style={{ bottom: '12.5vh', left: '35vw' }}
            size={8}
            fill="#663399"
            {...starProps}
          />
        </div>
      )}
      {children}
    </main>
  )
}

Content.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  decoration: PropTypes.bool,
}

Content.defaultProps = {
  center: false,
  decoration: false,
}

export default Content
