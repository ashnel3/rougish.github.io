export class Logger {
  readonly _el: HTMLElement
  readonly messages: HTMLElement[] = []

  interval: number = 3000
  timeout: number | undefined

  constructor(el: HTMLElement | null) {
    if (el === null) {
      throw new Error('Failed to create logger!')
    }
    this._el = el
  }

  remove(): void {
    const msg = this.messages.shift()
    msg?.remove()
    if (this.messages.length > 0) {
      this.timeout = window.setTimeout(() => {
        this.remove()
      }, this.interval * 0.5)
    } else {
      this._el.style.display = 'none'
    }
  }

  send(msg: string): void {
    const li = document.createElement('li')
    li.textContent = msg
    this._el.style.display = 'block'
    this.messages.push(this._el.appendChild(li))

    clearTimeout(this.timeout)
    this.timeout = window.setTimeout(() => {
      this.remove()
    }, this.interval)
  }
}
