import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import styled, { keyframes } from 'react-emotion'

import Message from '../components/message'
import Meta from '../components/meta'
import Toolbar from '../components/toolbar'

const loaderSize = 20

const scale = keyframes`
0% { transform: scale(0); opacity: 0; }
5% { opacity: 1; }
100% { transform: scale(1); opacity: 0; }
`

const Loader = styled.span({
  display: 'inline-block',
  width: loaderSize,
  height: loaderSize,
  marginRight: '0.5rem',
  position: 'relative',
  top: 4,
  'div:nth-child(2)': {
    animationDelay: '-0.8s',
  },
  'div:nth-child(3)': {
    animationDelay: '-0.4s',
  },
})

const LoaderBall = styled.div(({ theme }) => ({
  backgroundColor: theme.accent,
  borderRadius: '100%',
  margin: 2,
  animationFillMode: 'both',
  position: 'absolute',
  opacity: 0,
  margin: 0,
  width: loaderSize,
  height: loaderSize,
  animation: `${scale} 1s 0s linear infinite`,
}))

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
              {loading && (
                <p>
                  <Loader>
                    <LoaderBall />
                    <LoaderBall />
                    <LoaderBall />
                  </Loader>
                  Fetching message details&hellip;
                </p>
              )}
              {messages && (
                <>
                  <p>
                    <Loader>
                      <LoaderBall />
                      <LoaderBall />
                      <LoaderBall />
                    </Loader>
                    Fetching message details&hellip;
                  </p>
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
