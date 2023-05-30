import { Level } from './Level'
import { Player } from './Player'

import type { Cell } from './Cell'

export class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly level: Level
  readonly player: Player

  cellSize = -1
  cellSelect: Cell | undefined
  fontSize = 12
  offsetRow = 0
  offsetCol = 0
  screenWidth = 0
  screenHeight = 0

  constructor(canvas: HTMLCanvasElement | null) {
    const ctx = canvas?.getContext('2d') ?? null
    if (canvas === null || ctx === null) {
      throw new Error('Failed to create rendering context!')
    }
    this.canvas = canvas
    this.ctx = ctx
    this.player = new Player(this, 0, 0)
    this.level = new Level(this, 128, 128).create()

    // Handle events
    this._resize()
    this.canvas.addEventListener('mousedown', this._mousedown.bind(this))
    window.addEventListener('resize', this._resize.bind(this))
    window.addEventListener('mousemove', this._mousemove.bind(this))
    window.addEventListener('keydown', this._keydown.bind(this))
  }

  _mousedown(ev: MouseEvent): void {
    this.cellSelect?.click(ev.button)
  }

  _mousemove(ev: MouseEvent): void {
    const col = Math.floor(ev.y / this.cellSize)
    const row = Math.floor(ev.x / this.cellSize)
    this.cellSelect?.next(this)
    if (col < this.screenHeight && row < this.screenWidth) {
      this.cellSelect = this.level.get(row, col)
      this.cellSelect?.hover(this.ctx, this.cellSize)
    } else {
      this.cellSelect = undefined
    }
  }

  _keydown(ev: KeyboardEvent): void {
    this.player.keydown(ev.key)
  }

  _resize(ev?: UIEvent): void {
    this.cellSize = this.ctx.measureText('A').width * 4.03
    this.screenWidth = Math.floor(innerWidth / this.cellSize)
    this.screenHeight = Math.floor(innerHeight / this.cellSize)
    this.canvas.width = innerWidth - (innerWidth % this.cellSize)
    this.canvas.height = innerHeight - (innerHeight % this.cellSize)
    this.next()
  }

  /** Destroy game */
  destroy(): void {
    this.canvas.removeEventListener('mousedown', this._mousedown)
    window.removeEventListener('resize', this._resize)
    window.removeEventListener('mousemove', this._mousemove)
    window.removeEventListener('keydown', this._keydown)
  }

  next(): void {
    this.ctx.font = `${this.fontSize}px Hack, monospace`
    this.ctx.fillStyle = '#fff'
    this.level.forEach(
      (cell) => {
        cell.next(this)
      },
      this.screenWidth,
      this.screenHeight,
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
