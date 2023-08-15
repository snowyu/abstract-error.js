export class AbstractError extends Error {
  /**
   * Create an Error Class
   *
   * @param {string} aType the error type(class) name
   * @param {number} aErrorCode the error code, should be greater than 0.
   * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
   * @returns {typeof AbstractError} the new Error Class
   */
  static createErrorClass(aType: string, aErrorCode: number, ParentErrorClass?: typeof AbstractError): typeof AbstractError

  /**
   * the error code
   */
  code: number

  constructor(msg?: string, errno?: number)
}

/**
 * Create an Error Class
 *
 * @param {string} aType the error type(class) name
 * @param {number} aErrorCode the error code, should be greater than 0.
 * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
 * @returns {typeof AbstractError} the new Error Class
 */
export function createErrorClass(aType: string, aErrorCode: number, ParentErrorClass?: typeof AbstractError): typeof AbstractError

export default AbstractError
