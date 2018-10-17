import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import styled from 'react-emotion'
import { FaPlus } from 'react-icons/fa'
import { Link as GatsbyLink } from 'gatsby'

import FloatingButton from '../components/floating-button'
import MessageList from '../components/message-list'

const Container = styled.div()

const BottomRight = styled.div({
  position: 'fixed',
  bottom: 80,
  right: 16,
})

const IndexPage = () => (
  <Query
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
                      body {
                        data
                      }
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
    children={({ loading, error, data }) => (
      <Container>
        {loading && <p>Loading mail&hellip;</p>}
        {data.google && (
          <MessageList
            css={{ paddingBottom: 48 }}
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
