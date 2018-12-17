import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { MdArrowForward } from 'react-icons/md'
import format from 'date-fns/format'

import AirMail from './air-mail'
import decodePayload from '../util/parse-payload'

const Title = ({ className, showAction, ...rest }) => (
  <h2 className={cx('message__title', className)} {...rest}>
    {rest.children}
  </h2>
)

const formatFrom = from => (from || '').split('<').shift()
const displayMessage = parts =>
  (parts || [])
    .filter(part => part.mimeType === 'text/html')
    .map((part, index) => (
      <div
        className="message__detail"
        key={index}
        dangerouslySetInnerHTML={{ __html: decodePayload(part.body) }}
      />
    ))

function Message({ className, showAction, showTo, stripe, payload }) {
  const { date, from, parts, subject, to } = payload
  return (
    <div className="message">
      {stripe && <AirMail />}
      <div
        className={cx(
          'message__content',
          showAction && 'message__content--has-action',
          className
        )}
      >
        <div
          className={cx(
            'message__details',
            showAction && 'message__details--action'
          )}
        >
          <Title>{formatFrom(from)}</Title>
          {showTo && to && <Title>TO: {to}</Title>}
          <Title className="message__title--subject">{subject}</Title>
          {!showAction && (
            <Title className="message__title--has-action">{date}</Title>
          )}
        </div>
        {displayMessage(parts)}
        {showAction && (
          <div className="message__action">
            <span style={{ fontSize: 12, marginRight: '0.5rem' }}>
              {format(date, 'MMM DD')}
            </span>
            <MdArrowForward style={{ verticalAlign: 'sub' }} />
          </div>
        )}
      </div>
    </div>
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
