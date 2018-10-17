import React from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import Message from './message'

const Container = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
})

const Item = styled.li({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
})

function MessageList({ className, messages }) {
  return (
    <Container className={className}>
      {messages.map(message => (
        <Item key={message.id}>
          <Link
            to={`/messages/${message.id}`}
            css={{ textDecoration: `none` }}
            state={{
              id: message.id,
            }}
          >
            <Message {...message} />
          </Link>
        </Item>
      ))}
    </Container>
  )
}

MessageList.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
}

export default MessageList
