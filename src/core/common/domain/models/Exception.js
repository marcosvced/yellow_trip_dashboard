/**
 * @typedef {Object} DataException
 * @property {string} kind
 * @property {Error} error
 * */

export const ExceptionKeys = {
  UNEXPECTED: 'UnexpectedException',
  BAD_REQUEST: 'BadRequestException',
  NOT_IMPLEMENTED: 'MethodNotImplementedException',
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
/**
 * @param {string} method
 * @return {DataException}
 * */
export function MethodNotImplementedException(method) {
  return {
    kind: ExceptionKeys.NOT_IMPLEMENTED,
    error: new Error(`Method ${method}() must be implemented.`),
  }
}
