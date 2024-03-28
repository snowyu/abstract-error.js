export class AbstractError extends Error {
  /**
   * Create an Error Class
   *
   * @param {string} aType the error type(class) name
   * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
   * @returns {typeof AbstractError} the new Error Class
   */
  static createErrorClass(aType: string, ParentErrorClass?: typeof AbstractError): typeof AbstractError
  /**
   * Create an Error Class
   *
   * @param {string} aType the error type(class) name
   * @param {number|string} [aErrorCode] the error code, it should be not equal 0 if it's a number.
   * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
   * @returns {typeof AbstractError} the new Error Class
   */
  static createErrorClass(aType: string, aErrorCode?: number|string, ParentErrorClass?: typeof AbstractError): typeof AbstractError

  /**
   * the error code
   */
  code: number|string

  constructor(msg?: string, errno?: number|string)
}

/**
 * Create an Error Class
 *
 * @param {string} aType the error type(class) name
 * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
 * @returns {typeof AbstractError} the new Error Class
 */
export function createErrorClass(aType: string, ParentErrorClass?: typeof AbstractError): typeof AbstractError
/**
 * Create an Error Class
 *
 * @param {string} aType the error type(class) name
 * @param {number|string} [aErrorCode] the error code, it should be not equal 0 if it's a number.
 * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
 * @returns {typeof AbstractError} the new Error Class
 */
export function createErrorClass(aType: string, aErrorCode?: number|string, ParentErrorClass?: typeof AbstractError): typeof AbstractError

export default AbstractError
