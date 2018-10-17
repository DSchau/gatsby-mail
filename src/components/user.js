import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'

function User({ children }) {
  return (
    <Query
      query={gql`
        query getUserDetails {
          me {
            gmail {
              email
            }
          }
        }
      `}
      children={({ data }) => children({ user: data.me ? data.me.gmail : null })}
    />
  )
}

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User
