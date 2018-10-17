import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { FaChevronRight } from 'react-icons/fa'

import decodePayload from '../util/parse-payload'

const Container = styled.div(
  {
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

const Content = styled.div()

const Action = styled.div({
  position: `absolute`,
  right: 8,
})

function Message({ showAction, payload }) {
  const { parts, subject } = payload
  return (
    <Container>
      <Subject>{subject}</Subject>
      {parts && (
        <>
          {
            parts.filter(part => part.mimeType === 'text/html').map((part, index) => (
              <Content key={index} dangerouslySetInnerHTML={{ __html: decodePayload(part.body) }} />
            ))
          }
        </>
      )}
      {showAction && (
        <Action>
          <FaChevronRight />
        </Action>
      )}
    </Container>
  )
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  showAction: PropTypes.bool,
  payload: PropTypes.shape({
    parts: PropTypes.arrayOf(PropTypes.shape({
      body: PropTypes.shape({
        data: PropTypes.string
      }),
      mimeType: PropTypes.string
    })),
    subject: PropTypes.string.isRequired
  })
}

export default Message
