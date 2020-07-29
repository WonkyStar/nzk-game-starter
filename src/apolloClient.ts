import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

class GraphQLClient {
  private _token: string
  gqlEndpoint: string = 'https://graphql.nightzookeeper.com/graphql'
  client: ApolloClient<NormalizedCacheObject>

  constructor (token: string) {
    this.token = token
  }

  set token(token: string) {
    this._token = token
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${this._token}`
        }
      }
    })
    const httpLink = createHttpLink({ uri: this.gqlEndpoint })
    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    })
  }
}

export let apolloClient = new GraphQLClient('')

export default () => {
  return apolloClient.client
}
