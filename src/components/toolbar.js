import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { FaChevronLeft } from 'react-icons/fa'
import { Link } from 'gatsby'

const Container = styled.div(
  {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem',
    margin: '0.5rem 0',
    minHeight: 48,
  },
  ({ theme }) => ({
    border: `1px solid ${theme.inverted.color}`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  })
)

const LinkButton = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  padding: '0.5rem 1rem',
  color: theme.color,
  fontSize: 18,
  transition: '175ms cubic-bezier(.17, .67, .83, .67)',
  ':hover': {
    backgroundColor: theme.inverted.color,
  },
  ':active': {
    backgroundColor: theme.inverted.bgLight,
  },
}))

function Toolbar({ className }) {
  return (
    <Container className={className}>
      <LinkButton to="/" title="Back to inbox">
        <FaChevronLeft />
      </LinkButton>
    </Container>
  )
}

Toolbar.propTypes = {
  className: PropTypes.string,
}

export default Toolbar
