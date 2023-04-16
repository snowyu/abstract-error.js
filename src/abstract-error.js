import {createCtor, createFunction, inherits, setPrototypeOf} from 'inherits-ex'

function firstLower(s) {
  if (s === 'IO') {return s.toLowerCase()}
  return s[0].toLowerCase() + s.substring(1)
}

export const Errors = {}

const kOk             = 0
const kNotFound       = 1
const kCorruption     = 2
const kNotSupported   = 3
const kInvalidArgument= 4
const kIOError        = 5
const kNotOpened      = 6
const kInvalidType    = 7
const kInvalidFormat  = 8

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

export function NotImplementedError() {
  if (!new.target) return new NotImplementedError()
  const ctor = this.Class || this.constructor
  const self = Reflect.construct(AbstractError, ['NotImplemented', kNotSupported], ctor)
  return self
}
inherits(NotImplementedError, AbstractError)

Errors.NotImplementedError = NotImplementedError

const defaultErrorCodes = {
  Ok: kOk,
  NotFound: kNotFound,
  Corruption: kCorruption,
  NotSupported: kNotSupported,
  InvalidArgument: kInvalidArgument,
  IO: kIOError,
  NotOpened: kNotOpened,
  InvalidType: kInvalidType,
  InvalidFormat: kInvalidFormat,
}

/**
 * Create an Error Class
 *
 * @param {string} aType the error type
 * @param {number} aErrorCode the error code, should be greater than 0.
 * @param {typeof AbstractError} [ParentErrorClass] the parent error class. defaults to AbstractError
 * @returns {typeof AbstractError} the new Error Class
 */
export function createError(aType, aErrorCode, ParentErrorClass=AbstractError) {
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

// create error classes for defaultErrorCodes
for (const k in defaultErrorCodes) {
  const Err = createError(k, defaultErrorCodes[k])
  if (defaultErrorCodes[k] > 0) (Errors[k + 'Error'] = Err)

  /* // the error code
  AbstractError[k] = errorCodes[k]

  // generate AbstractError.isNotFound(err) class methods:
  AbstractError['is' + k] = (function (i, aType) {
    return function isNotFound(err) {err.code === i || (err.code == null && err.message && err.message.substring(0, aType.length) === aType)}
  })(errorCodes[k], k)

  // generate AbstractError.notFound() instance methods:
  AbstractError.prototype[firstLower(k)] = (function(aType) {
    return function notFound() {return AbstractError[aType](this)}
  })('is' + k)
  if (errorCodes[k] > 0) {
    Err = (function(i, aType) {
      return function (msg) {
        if (msg == null || msg === '') {msg = aType}
        return AbstractError.call(this, msg, i)
      }
    })(errorCodes[k], k)
    inherits(Err, AbstractError)

    // #generate NotFoundError,... Classes
    Errors[k + 'Error'] = Err
  }
  // ###
  // */
}
