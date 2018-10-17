import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { FaChevronRight } from 'react-icons/fa'

const Container = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    margin: '0.25rem 0',
    position: `relative`,
  },
  ({ theme }) => ({
    backgroundColor: theme.bgLight,
    color: theme.inverted.bg,
  })
)

const Subject = styled.h2({
  margin: 0,
  padding: 0,
  fontSize: 18,
})

const Action = styled.div({
  position: `absolute`,
  right: 8,
})

function Message({ id }) {
  return (
    <Container>
      <Subject>{id}</Subject>
      <Action>
        <FaChevronRight />
      </Action>
    </Container>
  )
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Message
