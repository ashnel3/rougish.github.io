import { Cell, type CellPalette } from './Cell'

export class Actor extends Cell {
  health: number
  healthMax: number
  lv: number
  frozen = false

  constructor(
    label: string,
    name: string,
    description: string,
    healthMax: number,
    lv: number,
    row: number,
    col: number,
    palette: Partial<CellPalette> = {},
  ) {
    super(label, name, description, row, col, palette, { walkable: false })
    this.health = healthMax
    this.healthMax = healthMax
    this.lv = lv
  }
}
