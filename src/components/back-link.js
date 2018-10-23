import React from 'react'
import styled from 'react-emotion'
import { Link as GatsbyLink } from 'gatsby'
import { MdArrowBack } from 'react-icons/md'

const Link = styled(GatsbyLink)(({ theme }) => ({
  color: theme.link,
  fontSize: 14,
  textDecoration: 'none',
  transition: '175ms ease-in-out',
  ':hover': {
    textDecoration: 'underline',
  },
}))

function BackLink({ children, className, to }) {
  return (
    <Link className={className} to={to}>
      <MdArrowBack css={{ marginRight: '0.5rem' }} />
      {children}
    </Link>
  )
}

export default BackLink
