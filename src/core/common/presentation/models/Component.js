export class Component extends HTMLElement {
    constructor() {
        super()
        // this.attachShadow({mode: 'open'})

        if (this.constructor === Component) {
            throw new Error('Component is an abstract class and cannot be instantiated directly.')
        }
    }

    async connectedCallback() {
        const template = await this.template()
        const styles = await this.styles()
        this.classList.add(`ui-${this.constructor.name.toLowerCase()}`)
        this.innerHTML = `<style>${styles}</style>${template}`
        if (this.setup) {
            this.setup()
        }

    }

    template() {
        throw new Error('Classes extending Component must implement method \'template\'')
    }

    styles() {
        throw new Error('Classes extending Component must implement method \'styles\'')
    }

    setup() {
        return undefined
    }

    async _loadPartial(path) {
        const response = await fetch(path)
        return await response.text()
    }
}
