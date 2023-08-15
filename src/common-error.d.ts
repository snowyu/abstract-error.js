import {AbstractError} from './abstract-error.js'

declare const kOk             = 0
declare const kNotFound       = 1
declare const kCorruption     = 2
declare const kNotSupported   = 3
declare const kInvalidArgument= 4
declare const kIOError        = 5
declare const kNotOpened      = 6
declare const kInvalidType    = 7
declare const kInvalidFormat  = 8

export class CommonError extends AbstractError {
  static isOk(err: CommonError): boolean
  static isNotFound(err: CommonError): boolean
  static isCorruption(err: CommonError): boolean
  static isNotSupported(err: CommonError): boolean
  static isInvalidArgument(err: CommonError): boolean
  static isIO(err: CommonError): boolean
  static isNotOpened(err: CommonError): boolean
  static isInvalidType(err: CommonError): boolean
  static isInvalidFormat(err: CommonError): boolean

  static Ok : number
  static NotFound : number
  static Corruption : number
  static NotSupported : number
  static InvalidArgument : number
  static IO : number
  static NotOpened : number
  static InvalidType : number
  static InvalidFormat : number

  constructor(msg?: string, errno?: number)

  ok(): boolean
  notFound(): boolean
  corruption(): boolean
  notSupported(): boolean
  invalidArgument(): boolean
  iO(): boolean
  notOpened(): boolean
  invalidType(): boolean
  invalidFormat(): boolean
}

declare class NotImplementedError extends CommonError {}
declare type DefaultErrorNames =
  'Ok' |
  'NotFound' |
  'Corruption' |
  'NotSupported' |
  'InvalidArgument' |
  'IO' |
  'NotOpened' |
  'InvalidType' |
  'InvalidFormat'

export type Errors = {
  NotImplementedError: typeof CommonError,
  OkError: typeof CommonError,
  NotFoundError: typeof CommonError,
  CorruptionError: typeof CommonError,
  NotSupportedError: typeof CommonError,
  InvalidArgumentError: typeof CommonError,
  IOError: typeof CommonError,
  NotOpenedError: typeof CommonError,
  InvalidTypeError: typeof CommonError,
  InvalidFormatError: typeof CommonError,
}
