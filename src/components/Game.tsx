import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import scenes from '../scenes'
import gql from 'graphql-tag'
import { useApolloClient } from '../context/ApolloProvider'

export const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: window.innerWidth,// * window.devicePixelRatio,
  height: window.innerHeight,// * window.devicePixelRatio,
  resolution: 1,
  backgroundColor: "#EDEEC9",
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false // true
    }
  }
}

const Game = () => {
  const client = useApolloClient()

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    // Example of GraphQL Query
    const { data } = await client.query({
      query: gql`
        query { me { _id, username, avatar { url } } }
      `
    })
    launch(data)
  }

  const launch = (data) => {
    new Phaser.Game({ ...config, scene:
      config.scene.map(s => {
        // Passing new props to Phaser Scenes
        return props => new s({ ...props, extend: { user: data.me }})
      })
    })
  }

  return <div id='game' />
}

export default () => {
  return <Game />
}
