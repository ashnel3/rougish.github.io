import { Cell } from './Cell'

import type { Game } from './Game'
import type { CellFlags, CellPalette } from './Cell'

export class Entity extends Cell {
  constructor(
    game: Game,
    label: string,
    name: string,
    description: string,
    row: number,
    col: number,
    palette: Partial<CellPalette> = {},
    flags: Partial<CellFlags> = {},
  ) {
    super(game, label, name, description, row, col, palette, flags)
  }
}
