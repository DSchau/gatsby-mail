import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import getAuth, { appId } from './src/util/authentication'

const client = new ApolloClient({
  uri: `https://serve.onegraph.com/dynamic?app_id=${appId}`,
  request: operation => operation.setContext({ headers: getAuth().authHeaders() })
})

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {element}
    </ApolloProvider>
  )
}
