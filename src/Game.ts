import { Level } from './Level'
import { Player } from './Player'

import type { Cell } from './Cell'

export class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly level: Level
  readonly player: Player

  offsetRow = 0
  offsetCol = 0
  screenWidth = 0
  screenHeight = 0
  fontSize = 12
  cellSize = -1
  cellSelect: Cell | undefined

  constructor(canvas: HTMLCanvasElement | null) {
    const ctx = canvas?.getContext('2d') ?? null
    if (canvas === null || ctx === null) {
      throw new Error('Failed to create rendering context!')
    }
    this.canvas = canvas
    this.ctx = ctx
    this.player = new Player(0, 0)
    this.level = new Level(this.player, 128, 128).create()

    // Handle events
    this._resize()
    window.addEventListener('resize', this._resize.bind(this))
    this.canvas.addEventListener('mousedown', this._mousedown.bind(this))
    window.addEventListener('mousemove', this._mousemove.bind(this))
  }

  _mousedown(ev: MouseEvent): void {
    this.cellSelect?.click(ev.button)
  }

  _mousemove(ev: MouseEvent): void {
    const col = Math.floor(ev.x / this.cellSize)
    const row = Math.floor(ev.y / this.cellSize)
    this.cellSelect?.next(this)
    if (col < this.screenWidth && row < this.screenHeight) {
      this.cellSelect = this.level.get(row, col)
      this.cellSelect?.hover(this.ctx, this.cellSize)
    } else {
      this.cellSelect = undefined
    }
  }

  _resize(ev?: UIEvent): void {
    this.canvas.width = innerWidth
    this.canvas.height = innerHeight
    this.cellSize = this.ctx.measureText('A').width * 4.03
    this.screenWidth = Math.floor(this.canvas.width / this.cellSize)
    this.screenHeight = Math.floor(this.canvas.height / this.cellSize)
    this.next()
  }

  /** Destroy game */
  destroy(): void {
    window.removeEventListener('resize', this._resize)
    this.canvas.removeEventListener('mousedown', this._mousedown)
    window.removeEventListener('mousemove', this._mousemove)
  }

  next(): void {
    this.ctx.font = `${this.fontSize}px Hack, monospace`
    this.ctx.fillStyle = '#fff'
    this.level.forEach(
      (cell) => {
        cell.next(this)
      },
      this.screenHeight,
      this.screenWidth,
      this.offsetRow,
      this.offsetCol,
    )
    this.ctx.stroke()
  }

  /** Start new game */
  start(): void {
    this.next()
  }
}
