import { h, createContext } from 'preact'
import { useEffect, useContext, useRef } from 'preact/hooks'
import getApolloClient, { apolloClient } from '../apolloClient'
import { useAuthentication } from './AuthenticationProvider';
import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

export const ApolloContext = createContext(null);

const ApolloProvider = ({ children }) => {
  const clientRef = useRef()
  const { token } = useAuthentication()
  const client = clientRef.current as ApolloClient<NormalizedCacheObject>

  useEffect(() => {
    init()
  }, [])

  const handleToken = () => {
    if (!token) return
    apolloClient.token = token.accessToken.value
  }

  useEffect(() => { handleToken() }, [token])

  const init = async () => {
    clientRef.current = await getApolloClient()
  }

  return <ApolloContext.Provider value={client}>
    { children }
  </ApolloContext.Provider>
}

export const useApolloClient = () => {
  const client = useContext(ApolloContext)
  return client
}

export default ApolloProvider
