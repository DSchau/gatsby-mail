import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Link } from 'gatsby'
import styled from 'react-emotion'
import { FaChevronLeft } from 'react-icons/fa'

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  margin: '0.25rem 0',
  marginRight: 'auto',
  backgroundColor: theme.color,
  color: theme.bg,
  padding: '0.25rem 0.5rem',
}))

function Wrapper({ children, id }) {
  return (
    <>
      <StyledLink to="/" title="Back to inbox">
        <FaChevronLeft />
      </StyledLink>
      {id ? children : <h1>Message not found</h1>}
    </>
  )
}

function Messages({ location }) {
  const { id } = location.state

  return (
    <Wrapper id={id}>
      <Query
        query={gql`
          query GetMessageById($messageId: String!) {
            google {
              gmail {
                message(id: $messageId) {
                  payload {
                    date
                    to
                    from
                    subject
                  }
                }
              }
            }
          }
        `}
        variables={{ messageId: id }}
        children={({ loading, error, data }) => {
          const message = data && data.google ? data.google.gmail.message : null
          return (
            <>
              {loading && <p>Fetching message details&hellip;</p>}
              {message && (
                <>
                  <h1>{message.payload.subject}</h1>
                  <h2>TO: {message.payload.to}</h2>
                  <h2>FROM: {message.payload.from}</h2>
                </>
              )}
            </>
          )
        }}
      />
    </Wrapper>
  )
}

export default Messages
