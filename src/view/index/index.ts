import { Game } from '../../Game'

import './index.css'

// Main
void (async () => {
  const game = new Game(document.getElementById('screen') as HTMLCanvasElement)
  game.start()
})()
