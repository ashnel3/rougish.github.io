import { Cell } from './Cell'

import type { Actor } from './Actor'
import type { Player } from './Player'

export class Level {
  readonly rows: number
  readonly cols: number
  map: Cell[][]
  entities: []
  actors: Actor[]

  constructor(player: Player, rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.actors = [player]
    this.entities = []
    this.map = []
  }

  get(row: number, col: number): Cell | undefined {
    return this.actors.find((a) => a.row === row && a.col === col) ?? this.map?.[row]?.[col]
  }

  forEach(
    cb: (c: Cell, row: number, col: number) => void,
    rMax: number,
    cMax: number,
    offsetRow = 0,
    offsetCol = 0,
  ): this {
    for (let r = offsetRow; r < Math.min(rMax, this.rows); r++) {
      for (let c = offsetCol; c < Math.min(cMax, this.cols); c++) {
        cb(this.map[r][c], r, c)
      }
    }
    for (const a of this.actors) {
      cb(a, a.row, a.col)
    }
    return this
  }

  create(): this {
    this.map = new Array(this.cols)
      .fill(undefined)
      .map((v, c) =>
        new Array(this.rows)
          .fill(undefined)
          .map((_v, r) => new Cell('.', 'Stone wall', '', r, c, { bg1: '#303030', bg2: '#404040', border: '#777' })),
      )
    return this
  }
}
