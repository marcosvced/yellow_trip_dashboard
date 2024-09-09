import {faker} from "@faker-js/faker";

/** @interface */
export class Factory {
    constructor() {
        this.faker = faker
    }

    static new() {
        return new this()
    }

    create(extra = {}) {
        return {}
    }

    times(times, extra = {}) {
        return [...Array(times).keys()].map(() => {
            return this.create(extra)
        })
    }
}