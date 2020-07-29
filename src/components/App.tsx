import { h } from 'preact'
import Game from './Game'
import ApolloProvider from '../context/ApolloProvider'
import AuthenticationProvider, { useAuthentication } from '../context/AuthenticationProvider'
import Login from './Login'

const App = () => {
  const { loggedIn, loading } = useAuthentication()
  if (loading) return <div>Loading...</div>
  if (!loggedIn) return <Login />
  return <Game />
}

export default (props) => {
  return <AuthenticationProvider>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </AuthenticationProvider>
}