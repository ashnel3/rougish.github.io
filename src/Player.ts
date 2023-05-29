import { Actor } from './Actor'

export class Player extends Actor {
  constructor(row: number = 0, col: number = 0) {
    super('P', 'You!', 'The mysterious hero.', 10, 1, row, col, { bg1: '#00f', bg2: '#44f', border: '#fff' })
  }

  click(button: number): void {
    console.log('Clicked player!')
  }
}
