/** @interface */
export class Interface {
    constructor(model) {
        if (this.constructor === model) {
            throw new Error("Cannot instantiate an interface.");
        }
    }
}
