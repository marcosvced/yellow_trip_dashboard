/**
 * @typedef {Object} DataException
 * @property {string} kind
 * @property {Error} error
 * */

export const ExceptionKeys = {
    UNEXPECTED: 'UnexpectedException',
    BAD_REQUEST: 'BadRequestException',
}

/**
 * @return {DataException} */
export function UnexpectedException() {
    return {
        kind: ExceptionKeys.UNEXPECTED,
        error: new Error('🚨 Something went wrong.'),
    }
}

/**
 * @param {string} error
 * @return {DataException} */
export function BadRequestException(error) {
    return {
        kind: ExceptionKeys.BAD_REQUEST,
        error: new Error(`🚨 ${error}`),
    }
}