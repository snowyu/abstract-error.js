import { inherits } from 'inherits-ex'

function firstLower(s) {
  if (s === 'IO') {return s.toLowerCase()}
  return s[0].toLowerCase() + s.substring(1)
}

export function AbstractError(msg, errno) {
  if (!new.target) return new AbstractError(msg, errno)
  const ctor = this.Class || this.constructor
  const self = Reflect.construct(Error, arguments, ctor)
  // const self = Error.apply(this, arguments)
  // setPrototypeOf(self, ctor.prototype)
  self.code = errno
  if (Error.captureStackTrace) Error.captureStackTrace(self)
  return self
}
inherits(AbstractError, Error)

export default AbstractError

/**
 * Create an Error Class
 *
 * @param {string} aType the error type
 * @param {number} aErrorCode the error code, should be greater than 0.
 * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
 * @returns {typeof AbstractError} the new Error Class
 */
export function createErrorClass(aType, aErrorCode, ParentErrorClass=AbstractError) {
  ParentErrorClass[aType] = aErrorCode
  ParentErrorClass['is' + aType] = (function(aErrorCode, aType) {
    return function isError(err) {
      return err.code === aErrorCode ||
        (err.code == null && err.message && err.message.substring(0, aType.length) === aType)
    }
  })(aErrorCode, aType)
  ParentErrorClass.prototype[firstLower(aType)] = (function(aIsErrorType, ErrorClass) {
    return function isError() {return ErrorClass[aIsErrorType](this)}
  })('is' + aType, ParentErrorClass)

  class ErrorWithCode {
    constructor(msg, aCode) {
      if (!new.target) return new ErrorWithCode(msg, aCode)
      if (typeof aCode !== 'number') {aCode = aErrorCode}
      if (msg == null || msg === '') {msg = aType}
      const ctor = this.Class || this.constructor
      return Reflect.construct(ParentErrorClass, [msg, aCode], ctor)
    }
  }
  ErrorWithCode.prototype.name = aType + 'Error'
  inherits(ErrorWithCode, ParentErrorClass)
  return ErrorWithCode
}

AbstractError.createErrorClass = createErrorClass
