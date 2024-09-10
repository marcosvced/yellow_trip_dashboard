/**
 * @typedef {'DashboardBloc' | string} ContextKey
 * */
class Context {
  constructor() {
    // window.__APP__ = {}
    this.context = {}
  }

  /**
     * @param {ContextKey} key
     * @param {any} value
     */
  provide(key, value) {
    this.context[key] = value
  }

  /**
     * @param {ContextKey} key
     */
  inject(key) {
    if (this.context[key]) {
      return this.context[key]
    }
  }
}

export const context = new Context({})
