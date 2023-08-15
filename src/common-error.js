import {createCtor, createFunction, inherits, setPrototypeOf} from 'inherits-ex'

import {AbstractError, createError as _createError} from './abstract-error.js'

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

export function CommonError() {
  if (!new.target) return new CommonError()
  const ctor = this.Class || this.constructor
  const self = Reflect.construct(AbstractError, arguments, ctor)
  return self
}
inherits(CommonError, AbstractError)

export function NotImplementedError() {
  if (!new.target) return new NotImplementedError()
  const ctor = this.Class || this.constructor
  const self = Reflect.construct(CommonError, ['NotImplemented', kNotSupported], ctor)
  return self
}
inherits(NotImplementedError, CommonError)

Errors.NotImplementedError = NotImplementedError

export function createError(aType, aErrorCode, ParentErrorClass=CommonError) {
  return _createError(aType, aErrorCode, ParentErrorClass)
}

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

// create error classes for defaultErrorCodes
for (const k in defaultErrorCodes) {
  const Err = _createError(k, defaultErrorCodes[k], CommonError)
  if (defaultErrorCodes[k] > 0) (Errors[k + 'Error'] = Err)
}