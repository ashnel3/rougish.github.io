import { Logger } from '../../Logger'
import { Game } from '../../Game'

import './index.css'

// Main
void (async () => {
  const logger = new Logger(document.getElementById('log'))
  const game = new Game(document.getElementById('screen') as HTMLCanvasElement, logger)
  game.start()
})()
