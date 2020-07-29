/***
 * The bridge will be used as a communication layer between
 * the Night Zookeeper App and the game inside the iframe
 */
interface BridgeInterface {
  config: {
    canRestart: boolean
  }
  _restartGame: () => void;
  closeGame?: () => void;
  onGameClosed: () => void;
  onGameLoading: () => void;
  onGameLoaded: () => void;
  onGameRestart: () => void;
  onGameFinished: (data) => void;
}

class DummyBridge implements BridgeInterface {

  config: {
    canRestart: true
  }

  _restartGame() {
    this.onGameRestart()
  }

  onGameRestart () {
    console.log(`[DummyBridge]: Restarting game`);
  }

  onGameLoading () {
    console.log(`[DummyBridge]: Loading game`);
  }

  onGameLoaded () {
    console.log(`[DummyBridge]: Game loaded`);
  }

  onGameClosed () {
    console.log(`[DummyBridge]: Game closed`);
  }

  onGameFinished (data) {
    console.log(`[DummyBridge]: Game finished`);
  }
}

const defaultConfig = {
  canRestart: true
}

const setBridge = () => {
  
  let bridge: BridgeInterface;
  //@ts-ignore
  if (window.eduBridge) {
    // @ts-ignore
    bridge = window.eduBridge
  } else {
    bridge = new DummyBridge()
  }

  bridge.config = {
    ...defaultConfig,
    ...bridge.config
  }

  return bridge;
};

export default setBridge;
