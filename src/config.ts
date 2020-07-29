const config = {
  nzkOAuthUrl: 'https://oauth.nightzookeeper.com',
  redirectUri: 'http://localhost:3000',
  oauthClientId: 'ijosdjia0asdasd0asda09'
}

if (_ENV === 'production') {
  config.nzkOAuthUrl = 'https://oauth.nightzookeeper.com'
  config.redirectUri = 'https://staging.nightzookeeper.com/games/word-hunt/'
  config.oauthClientId = 'ijosdjia0asdasd0asda09'
}

export default config
