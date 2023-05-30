import { Cell, type CellPalette } from './Cell'
import type { Game } from './Game'

export class Actor extends Cell {
  health: number
  healthMax: number
  lv: number
  frozen = false

  constructor(
    game: Game,
    label: string,
    name: string,
    description: string,
    healthMax: number,
    lv: number,
    row: number,
    col: number,
    palette: Partial<CellPalette> = {},
  ) {
    super(game, label, name, description, row, col, palette, { walkable: false })
    this.health = healthMax
    this.healthMax = healthMax
    this.lv = lv
  }
}
