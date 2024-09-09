export class WebComponent {
  /** @return {HTMLElement} */
  static mount(tag, attributes = {}) {
    WebComponent._renderToDocument(tag, attributes)
    return WebComponent._waitForComponentToRender(tag)
  }

  static _renderToDocument(tag, attributes) {
    const htmlAttributes = WebComponent._mapObjectToHTMLAttributes(attributes)
    document.body.innerHTML = `<${tag} ${htmlAttributes}></${tag}>`
  }

  static _mapObjectToHTMLAttributes(attributes) {
    return Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(' ')
  }

  static async _waitForComponentToRender(tag) {
    return new Promise((resolve) => {
      function requestComponent() {
        const element = document.body.querySelector(tag)
        if (element) {
          resolve(element)
        }
        else {
          window.requestAnimationFrame(requestComponent)
        }
      }
      requestComponent()
    })
  }
}
