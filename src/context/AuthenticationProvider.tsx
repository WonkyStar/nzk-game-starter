import { h, createContext } from 'preact'
import { useState, useContext, useEffect } from 'preact/hooks'
import config from '../config';
import Axios from 'axios';
import qs from 'qs'
import { getParameterByName } from '../utils/utils'
import { decode } from 'jsonwebtoken'

export const AuthenticationContext = createContext(null);

/***
 * You can authenticate your game via many methods
 * 
 * Method 1: LocalStorage
 * - Set 'lscache-v2-user-id' and 'lscache-v2-shared-secret-key' in localStorage
 * 
 * Method 2: Token in URL
 * - Pass accessToken with a JWT generated from NZK OAuth Server
 * 
 * Method 3: Manually set 'accessToken' in localStorage
 * - accessToken: { value: "JWT", expiresAt: "DATE" }
 * 
 * Method 4: Authentication page (for dev)
 * - If none of the above is used, a login page will prompt you to login
 */
const AuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    onTokenChanged(token)
  }, [token])

  const init = () => {
    setLoading(true)
    const sharedSecretKey = localStorage.getItem('lscache-v2-shared-secret-key')
    const userId = localStorage.getItem('lscache-v2-user-id')
    const token = localStorage.getItem('access-token')
    const urlToken = getParameterByName('accessToken')
    if (token) {
      setToken(JSON.parse(token))
    } else if (sharedSecretKey && userId && !token) {
      getToken(userId, sharedSecretKey)
    } else if (urlToken) {
      handleRawToken(urlToken)
    }
    setLoading(false)
  }

  const handleRawToken = (rawToken) => {
    try {
      let decoded = decode(rawToken)
      setToken({
        accessToken: {
          value: rawToken,
          expiresAt: new Date(decoded.exp)
      }})
    } catch (err) {
      console.error(err)
    }
  }

  const getToken = async (username, password) => {
    const { data } = await Axios.post('https://oauth.nightzookeeper.com/oauth/token', qs.stringify({
      username: username,
      password: password,
      client_id: config.oauthClientId,
      grant_type: 'password'
    }))
    setCurrentUser(data.user)
    setToken({
      accessToken: {
        value: data.accessToken,
        expiresAt: data.accessTokenExpiresAt
      },
      refreshToken: {
        value: data.refreshToken,
        expiresAt: data.refreshTokenExpiresAt
      }
    })
  }

  const onTokenChanged = (token) => {
    if (!token) return
    localStorage.setItem('access-token', JSON.stringify(token))
  }

  const value = {
    loading,
    currentUser,
    loggedIn: token !== null,
    token,
    setToken,
    setCurrentUser,
    getToken
  }

  return <AuthenticationContext.Provider value={value}>
    { children }
  </AuthenticationContext.Provider>
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext)
  return context
}

export default AuthenticationProvider
