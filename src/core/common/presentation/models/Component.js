import { MethodNotImplementedException } from '../../domain/models/Exception.js'

/** @abstract */
export class Component extends HTMLElement {
  constructor(withShadowRoot = true) {
    super()
    this.withShadowRoot = withShadowRoot
    if (withShadowRoot) {
      this.attachShadow({ mode: 'open' })
    }
  }

  async connectedCallback() {
    this.render()

    if (this.setup) {
      this.setup()
    }
  }

  /** @type {string} */
  static get tag() {
    throw MethodNotImplementedException('tag')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attr] = newValue
      this.render()
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
    const styles = this.styles()
    const template = this.template()
    this.classList.add(`ui-${this.constructor.name.toLowerCase()}`)
    const html = `${styles ? `<style>${styles}</style>` : ''} ${template}`

    if (this.withShadowRoot) {
      this.shadowRoot.innerHTML = html
    }
    else {
      this.innerHTML = html
    }
  }
}
