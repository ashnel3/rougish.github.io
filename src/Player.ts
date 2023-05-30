import { Actor } from './Actor'

import type { Game } from './Game'

export class Player extends Actor {
  readonly game: Game

  constructor(game: Game, row: number = 0, col: number = 0) {
    super('P', 'You!', 'The mysterious hero.', 10, 1, row, col, { bg1: '#00f', bg2: '#44f', border: '#fff' })
    this.game = game
  }

  keydown(key: string): void {
    const last = this.game.level.getTile(this.col, this.row)
    switch (key) {
      case 'ArrowUp':
      case 'w':
        this.col -= 1
        break

      case 'ArrowDown':
      case 's':
        this.col += 1
        break

      case 'ArrowLeft':
      case 'a':
        this.row -= 1
        break

      case 'ArrowRight':
      case 'd':
        this.row += 1
        break
      default:
    }
    last?.next(this.game)
    this.next(this.game)
  }

  click(button: number): void {
    console.log(`Clicked player! ${this.row} x ${this.col}`)
  }
}
