import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import styled from 'react-emotion'
import { FaPlus } from 'react-icons/fa'
import { Link as GatsbyLink } from 'gatsby'

import FloatingButton from '../components/floating-button'
import MessageList from '../components/message-list'

import getZIndex from '../style/z-index'

const Container = styled.div({
  zIndex: getZIndex('button'),
})

const BottomRight = styled.div({
  position: 'fixed',
  bottom: 24,
  right: 16,
})

const IndexPage = () => (
  <Query
    pollInterval={10000}
    query={gql`
      query GetMessages {
        google {
          gmail {
            queryThreads(maxResults: 25) {
              threads {
                id
                expanded {
                  messages {
                    id
                    payload {
                      date
                      from
                      to
                      subject
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    children={({ loading, data }) => (
      <Container>
        {loading && <p>Loading mail&hellip;</p>}
        {data.google && (
          <MessageList
            css={{ paddingBottom: 24 }}
            threads={data.google.gmail.queryThreads.threads}
          />
        )}
        <BottomRight>
          <FloatingButton as={GatsbyLink} to="/new">
            <FaPlus />
          </FloatingButton>
        </BottomRight>
      </Container>
    )}
  />
)

export default IndexPage
