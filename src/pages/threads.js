import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Link } from 'gatsby'
import styled from 'react-emotion'
import { FaChevronLeft } from 'react-icons/fa'

import Message from '../components/message'

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

function Threads({ location }) {
  const { id } = location.state

  return (
    <Wrapper id={id}>
      <Query
        query={gql`
          query GetMessageThread($threadId: String!) {
            google {
              gmail {
                thread(id: $threadId) {
                  expanded {
                    messages {
                      id
                      payload {
                        parts {
                          mimeType
                          body {
                            data
                          }
                        }
                        date
                        subject
                        from
                        to
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        variables={{ threadId: id }}
        children={({ loading, data }) => {
          const messages = data && data.google ? data.google.gmail.thread.expanded.messages : null
          return (
            <>
              {loading && <p>Fetching message details&hellip;</p>}
              {messages && (
                <>
                  {
                    messages.map(message => (
                      <Message key={message.id} {...message} />
                    ))
                  }
                </>
              )}
            </>
          )
        }}
      />
    </Wrapper>
  )
}

export default Threads
