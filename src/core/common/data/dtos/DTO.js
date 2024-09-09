import {Abstract} from "../../shared/Abstract.js";
import {MethodNotImplementedException} from "../../domain/models/Exception.js";

export class DTO extends Abstract {
    constructor() {
        super(DTO)
    }

    /** @abstract */
    toDomain() {
        throw MethodNotImplementedException('toDomain')
    }

}