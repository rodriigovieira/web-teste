import { ApolloClient } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

const httpLink = createHttpLink({
  uri: "https://backend-teste-nodejs.herokuapp.com/graphql"
})

const authMid = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("@token")

  // Set HEADERS to have authorization token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authMid.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
