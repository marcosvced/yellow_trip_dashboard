import { MethodNotImplementedException } from '../../domain/models/Exception.js'

/** @abstract */
export class Component extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    this.render()

    if (this.setup) {
      this.setup()
    }
  }

  /** @type {any} */
  template() {
    throw MethodNotImplementedException('template')
  }

  styles() {
    return undefined
  }

  setup() {
    return undefined
  }

  render() {
    const template = this.template()
    const styles = this.styles()
    this.classList.add(`ui-${this.constructor.name.toLowerCase()}`)
    this.innerHTML = `${styles ? `<style>${styles}</style>` : ''} ${template}`
  }
}
