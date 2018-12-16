import React from 'react'
import { Link } from 'gatsby'
import { MdArrowBack } from 'react-icons/md'

function BackLink({ children, className, to }) {
  return (
    <Link className={`link--back ${className}`} to={to}>
      <MdArrowBack css={{ marginRight: '0.5rem' }} />
      {children}
    </Link>
  )
}

export default BackLink
