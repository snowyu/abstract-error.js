declare const kOk             = 0
declare const kNotFound       = 1
declare const kCorruption     = 2
declare const kNotSupported   = 3
declare const kInvalidArgument= 4
declare const kIOError        = 5
declare const kNotOpened      = 6
declare const kInvalidType    = 7
declare const kInvalidFormat  = 8

export class AbstractError extends Error {
  static isOk(err: AbstractError): boolean
  static isNotFound(err: AbstractError): boolean
  static isCorruption(err: AbstractError): boolean
  static isNotSupported(err: AbstractError): boolean
  static isInvalidArgument(err: AbstractError): boolean
  static isIO(err: AbstractError): boolean
  static isNotOpened(err: AbstractError): boolean
  static isInvalidType(err: AbstractError): boolean
  static isInvalidFormat(err: AbstractError): boolean

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

declare class NotImplementedError extends AbstractError {}
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
  NotImplementedError: typeof AbstractError,
  OkError: typeof AbstractError,
  NotFoundError: typeof AbstractError,
  CorruptionError: typeof AbstractError,
  NotSupportedError: typeof AbstractError,
  InvalidArgumentError: typeof AbstractError,
  IOError: typeof AbstractError,
  NotOpenedError: typeof AbstractError,
  InvalidTypeError: typeof AbstractError,
  InvalidFormatError: typeof AbstractError,
}
