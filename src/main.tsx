import "@babel/polyfill"
import 'phaser'
import { Bridge } from "./data/globals"
import setBridge from "./classes/DummyBridge"
import { render, h } from 'preact'
import App from './components/App'

// @ts-ignore
Bridge = setBridge()

render(<App />, document.querySelector('#content'))
