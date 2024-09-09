/** @abstract */
export class Abstract {
    constructor(model) {
        if (this.constructor === model) {
            throw new Error("Cannot instantiate an Abstract class.");
        }
    }
}

