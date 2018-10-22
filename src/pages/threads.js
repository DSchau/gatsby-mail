import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import Message from '../components/message'
import Meta from '../components/meta'
import Toolbar from '../components/toolbar'

function Wrapper({ children, id }) {
  return (
    <>
      <Toolbar />
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
          const messages =
            data && data.google
              ? data.google.gmail.thread.expanded.messages
              : null
          return (
            <>
              {loading && <p>Fetching message details&hellip;</p>}
              {messages && (
                <>
                  <Meta title={messages[0].payload.subject} />
                  {messages.map(message => (
                    <Message key={message.id} stripe={true} {...message} />
                  ))}
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
