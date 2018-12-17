import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'
import PropTypes from 'prop-types'

import Message from './message'

const Container = ({ className, ...rest }) => (
  <ul className={cx('message-list--container', className)} {...rest}>
    {rest.children}
  </ul>
)

const Item = ({ className, ...rest }) => (
  <li className={cx('message-list--message', className)} {...rest}>
    {rest.children}
  </li>
)

function MessageList({ className, threads }) {
  return (
    <Container className={className}>
      {threads.map(thread => {
        const message = thread.expanded.messages[0]
        return (
          <Item key={thread.id}>
            <Link
              to={`/threads/${thread.id}`}
              css={{ textDecoration: `none` }}
              state={{
                id: thread.id,
              }}
            >
              <Message showAction={true} showTo={false} {...message} />
            </Link>
          </Item>
        )
      })}
    </Container>
  )
}

MessageList.propTypes = {
  className: PropTypes.string,
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      expanded: PropTypes.shape({
        messages: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            payload: PropTypes.shape({
              body: PropTypes.shape({
                data: PropTypes.string,
              }),
              from: PropTypes.string,
              subject: PropTypes.string,
              to: PropTypes.string,
            }),
          })
        ),
      }),
    })
  ),
}

export default MessageList
