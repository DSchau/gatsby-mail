import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import BackLink from './back-link'

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.25rem',
  margin: '0.25rem 0',
  minHeight: 48,
})

function Toolbar({ className }) {
  return (
    <Container className={className}>
      <BackLink to="/" title="Back to inbox">
        Inbox
      </BackLink>
    </Container>
  )
}

Toolbar.propTypes = {
  className: PropTypes.string,
}

export default Toolbar
