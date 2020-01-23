// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { ApolloClient, ApolloLink, InMemoryCache } from "apollo-boost"
import { RestLink } from "apollo-link-rest"
import fetch from "isomorphic-fetch"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
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
  // Call the next link in the middleware chain
  return forward(operation)
})

export const client = new ApolloClient({
  uri: process.env.GATSBY_GRAPHQL_URI,
  link: authLink.concat(restLink),
  cache: new InMemoryCache(),
  fetch,
})

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
