export class Logger {
  readonly _el: HTMLElement

  constructor(el: HTMLElement | null) {
    if (el === null) {
      throw new Error('Failed to create logger!')
    }
    this._el = el
  }
}
