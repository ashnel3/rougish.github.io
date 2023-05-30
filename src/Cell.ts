import type { Game } from './Game'

export interface CellFlags {
  walkable: boolean
}

export interface CellPalette {
  bg1: string
  bg2: string
  border: string
  label: string
}

export class Cell {
  readonly game: Game
  readonly label: string
  readonly name: string
  readonly description: string

  flags: Partial<CellFlags>
  palette: Partial<CellPalette>
  col: number
  row: number

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
    this.game = game
    this.label = label
    this.name = name
    this.description = description
    this.col = col
    this.row = row
    this.flags = flags
    this.palette = palette
  }

  /** Clear cell */
  _clear(ctx: CanvasRenderingContext2D, cellSize: number): void {
    ctx.clearRect(cellSize * this.row + 1, cellSize * this.col + 1, cellSize - 2, cellSize - 2)
  }

  /** Draw cell background */
  _next_bg(ctx: CanvasRenderingContext2D, cellSize: number, color?: string): void {
    if (typeof color === 'string') {
      ctx.fillStyle = color
      ctx.fillRect(cellSize * this.row + 1, cellSize * this.col + 1, cellSize - 2, cellSize - 2)
    } else {
      this._clear(ctx, cellSize)
    }
  }

  /** Draw cell label */
  _next_label(ctx: CanvasRenderingContext2D, cellSize: number): void {
    const { actualBoundingBoxAscent, actualBoundingBoxDescent, width } = ctx.measureText(this.label)
    ctx.fillStyle = this.palette.label ?? '#fff'
    ctx.fillText(
      this.label,
      cellSize * this.row + cellSize * 0.5 - width * 0.5,
      cellSize * this.col + cellSize * 0.5 + (actualBoundingBoxAscent + actualBoundingBoxDescent) * 0.5,
    )
  }

  /** Draw cell border */
  _next_border(ctx: CanvasRenderingContext2D, cellSize: number): void {
    // Border
    if (typeof this.palette.border === 'string') {
      ctx.strokeStyle = this.palette.border
      ctx.strokeRect(cellSize * this.row + 1, cellSize * this.col + 1, cellSize - 2, cellSize - 2)
    }
  }

  /**
   * Handle cell clicked
   * @param button - Mouse button
   */
  click(button: number): void {
    switch (button) {
      case 0:
        break
      case 2:
        this.game.logger.send(`[${this.name}]: ${this.description}, ${this.row} x ${this.col}`)
        break
      default:
    }
  }

  /**
   * Draw hovered
   * @param ctx      - Canvas rendering context
   * @param cellSize - Cell size in pixels
   */
  hover(ctx: CanvasRenderingContext2D, cellSize: number): void {
    this._next_bg(ctx, cellSize, this.palette.bg2)
    this._next_border(ctx, cellSize)
    this._next_label(ctx, cellSize)
  }

  /**
   * Draw cell
   */
  next(): void {
    const { ctx, cellSize } = this.game
    this._next_bg(ctx, cellSize, this.palette.bg1)
    this._next_border(ctx, cellSize)
    this._next_label(ctx, cellSize)
  }
}
