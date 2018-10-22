import React from 'react'
import styled, { cx } from 'react-emotion'
import PropTypes from 'prop-types'
import { MdArrowForward } from 'react-icons/md'
import format from 'date-fns/format'

import AirMail from './air-mail'
import decodePayload from '../util/parse-payload'
import { SYSTEM_FONTS } from '../util/typography'

const Container = styled.div(({ theme }) => ({
  backgroundColor: theme.bg,
  borderBottomColor: theme.cardBorder,
  borderBottomStyle: `solid`,
  borderBottomWidth: 1,
  color: theme.inverted.bg,
  padding: '0.5rem 0',
  transition: '175ms cubic-bezier(.17, .67, .83, .67)',
  ':hover': {
    backgroundColor: theme.cardBorder,
  },
}))

const Content = styled.div({
  display: 'flex',
  position: `relative`,
})

const Details = styled.div(
  {
    padding: '0.25rem 1rem',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
  ({ showAction, theme }) => ({
    ...(showAction
      ? {
          paddingRight: 72,
        }
      : {
          backgroundColor: theme.name === 'dark' ? theme.bgDark : theme.bgLight,
        }),
  })
)

const To = styled.h2(
  {
    margin: '0.25rem 0',
    padding: 0,
    fontFamily: SYSTEM_FONTS.join(`,`),
    fontSize: 14,
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  ({ theme }) => ({
    color: theme.colorCalm,
  })
)

const From = styled(To)()

const Date = styled(To)()

const Subject = styled(To)(
  {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ({ theme }) => ({
    color: theme.color,
  })
)

const MessageContent = styled.div({
  padding: '0.25rem 1rem',
  lineHeight: 1.5,
  margin: '1rem 0',
})

const Action = styled.div(
  {
    position: `absolute`,
    top: '50%',
    right: 8,
    transform: 'translateY(-50%)',
  },
  ({ theme }) => ({
    color: theme.footerLink,
  })
)

const formatFrom = from => (from || '').split('<').shift()

function Message({ className, showAction, showTo, stripe, payload }) {
  const { date, from, parts, subject, to } = payload
  return (
    <Container>
      {stripe && <AirMail />}
      <Content
        css={{
          display: showAction ? 'flex' : 'block',
        }}
        className={cx('message', className)}
      >
        <Details showAction={showAction}>
          <From>{formatFrom(from)}</From>
          {showTo && to && <To>TO: {to}</To>}
          <Subject>{subject}</Subject>
          {!showAction && <Date>{date}</Date>}
        </Details>
        {parts && (
          <>
            {parts
              .filter(part => part.mimeType === 'text/html')
              .map((part, index) => (
                <MessageContent
                  key={index}
                  dangerouslySetInnerHTML={{ __html: decodePayload(part.body) }}
                />
              ))}
          </>
        )}
        {showAction && (
          <Action>
            <span css={{ fontSize: 12, marginRight: '0.5rem' }}>
              {format(date, 'MMM DD')}
            </span>
            <MdArrowForward css={{ position: 'relative', top: 2 }} />
          </Action>
        )}
      </Content>
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

Message.defaultProps = {
  stripe: false,
}

export default Message
