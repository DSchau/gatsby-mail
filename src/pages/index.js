import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { MdAdd } from 'react-icons/md'
import { Link as GatsbyLink } from 'gatsby'

import FloatingButton from '../components/floating-button'
import MessageList from '../components/message-list'
import Spinner from '../components/spinner'

const IndexPage = () => (
  <Query
    pollInterval={25000}
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
      <div className="index-page">
        {loading && <Spinner> Loading mail&hellip;</Spinner>}
        {data.google && (
          <MessageList
            css={{ paddingBottom: 24 }}
            threads={data.google.gmail.queryThreads.threads}
          />
        )}
        <div className="index-page--new-section">
          <FloatingButton as={GatsbyLink} to="/new">
            <MdAdd />
          </FloatingButton>
        </div>
      </div>
    )}
  />
)

export default IndexPage
