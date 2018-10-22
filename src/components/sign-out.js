import React from 'react'
import styled from 'react-emotion'
import { MdExitToApp } from 'react-icons/md'
import PropTypes from 'prop-types'

const Button = styled.button(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: 14,
  textDecoration: 'none',
  transition: '175ms ease-in-out',
  ':hover': {
    textDecoration: 'underline',
  },
}))

const Exit = styled(MdExitToApp)(({ theme }) => ({
  color: theme.footerLink,
}))

function Signout({ children, className, onClick }) {
  return (
    <Button className={className} onClick={onClick}>
      {children}
      <Exit size={24} />
    </Button>
  )
}

Signout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Signout
