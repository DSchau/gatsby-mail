import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { FaChevronRight } from 'react-icons/fa'

import decodePayload from '../util/parse-payload'

const Container = styled.div(
  {
    padding: '1rem',
    margin: '0.5rem 0',
    position: `relative`,
  },
  ({ theme }) => ({
    backgroundColor: theme.bgLight,
    color: theme.inverted.bg,
  })
)

const Details = styled.div(
  {
    margin: '0.5rem 0',
  },
  ({ showAction }) => ({
    ...(showAction
      ? {
          paddingRight: 24,
        }
      : {}),
  })
)

const To = styled.h2(
  {
    margin: '0.25rem 0',
    padding: 0,
    fontSize: 14,
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  ({ theme }) => ({
    color: theme.color,
  })
)

const From = styled(To)()

const Date = styled(To)()

const Subject = styled(To)({
  fontSize: 16,
  fontWeight: 'bold',
})

const Content = styled.div({
  lineHeight: 1.5,
  margin: '1rem 0',
})

const Action = styled.div({
  position: `absolute`,
  top: '50%',
  right: 8,
  transform: 'translateY(-50%)',
})

function Message({ className, showAction, showTo, payload }) {
  const { date, from, parts, subject, to } = payload
  return (
    <Container className={className}>
      <Details showAction={showAction}>
        <From>{from}</From>
        {showTo && to && <To>TO: {to}</To>}
        <Subject>{subject}</Subject>
        <Date>{date}</Date>
      </Details>
      {parts && (
        <>
          {parts
            .filter(part => part.mimeType === 'text/html')
            .map((part, index) => (
              <Content
                key={index}
                dangerouslySetInnerHTML={{ __html: decodePayload(part.body) }}
              />
            ))}
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
  showTo: PropTypes.bool,
  payload: PropTypes.shape({
    date: PropTypes.string,
    from: PropTypes.string,
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.shape({
          data: PropTypes.string,
        }),
        mimeType: PropTypes.string,
      })
    ),
    subject: PropTypes.string.isRequired,
    to: PropTypes.string,
  }),
}

export default Message
