export class Component extends HTMLElement {
    constructor() {
        super()

        if (this.constructor === Component) {
            throw new Error('Component is an abstract class and cannot be instantiated directly.')
        }
    }

    async connectedCallback() {
        this.render()

        if (this.setup) {
            this.setup()
        }

    }

    template() {
        throw new Error('Classes extending Component must implement method \'template\'')
    }

    styles() {
        return undefined
    }

    setup() {
        return undefined
    }

     render() {
        const template =  this.template()
        const styles =  this.styles()
        this.classList.add(`ui-${this.constructor.name.toLowerCase()}`)
        this.innerHTML = `${styles ? `<style>${styles}</style>` : ''} ${template}`
    }

    async _loadPartial(path) {
        const response = await fetch(path)
        return await response.text()
    }
}
