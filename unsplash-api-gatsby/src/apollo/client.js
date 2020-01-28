// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, ApolloLink, InMemoryCache } from "apollo-boost"
import { persistCache } from "apollo-cache-persist"
import { RestLink } from "apollo-link-rest"
import fetch from "isomorphic-fetch"
import React, { useEffect, useState } from "react"
import { LoadingContainer } from "../components/loadingcontainer"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
export const ApolloClientHOC = ({ children }) => {
  // Set state for the Apollo client
  const [client, setClient] = useState(undefined)

  useEffect(() => {
    // instantiate a new Memory Cache from the constructor
    const cache = new InMemoryCache()
    // Rest link for the base GraphQL endpoint
    const restLink = new RestLink({ uri: process.env.GATSBY_UNSPLASH_ENDPOINT })
    const authLink = new ApolloLink((operation, forward) => {
      // Pass the Unsplash API key to the authorization header
      // Accept-Version is set to return a v1 version JSON resposne of the API
      operation.setContext({
        headers: {
          authorization: `Client-ID ${process.env.GATSBY_UNSPLASH_API_KEY}`,
          "Accept-Version": "v1",
        },
      })
      return forward(operation)
    })
    // Configure the client
    const client = new ApolloClient({
      uri: process.env.GATSBY_GRAPHQL_URI,
      link: authLink.concat(restLink),
      cache,
      fetch,
    })
    // Configure persistance of Apollos cache
    // This is to persist cache data between hard refreshes, page loads, etc.
    persistCache({
      cache,
      // Use local storage as the storage provider
      storage: window.localStorage,
    }).then(() => {
      setClient(client)
    })

    return () => {}
  }, [])
  // If the client state is undefined return a loading indicator
  if (client === undefined)
    return (
      <div style={{ margin: 0 }}>
        <LoadingContainer />
      </div>
    )
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
