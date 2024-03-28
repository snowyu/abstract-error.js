### AbtractError [![Build Status](https://img.shields.io/travis/snowyu/abstract-error.js/master.png)](http://travis-ci.org/snowyu/abstract-error.js) [![npm](https://img.shields.io/npm/v/abstract-error.svg)](https://npmjs.org/package/abstract-error) [![downloads](https://img.shields.io/npm/dm/abstract-error.svg)](https://npmjs.org/package/abstract-error) [![license](https://img.shields.io/npm/l/abstract-error.svg)](https://npmjs.org/package/abstract-error)

abstract error class with error code supports to create error class quickly.

# Classes

# AbstractError

All Errors are derived from the AbstractError.

```javascript
import { AbstractError, createErrorClass } from 'abstract-error'
```

* Members:
  * `message`: the error message.
  * `code`: the error code.
* Class Methods:
  * `createErrorClass(aType: string, aErrorCode: number, ParentErrorClass=AbstractError): typeof AbstractError`

## CommonError

```javascript
import { CommonError } from 'abstract-error'
```

`CommonError` derived from the `AbstractError`. All Common Errors are derived from the `CommonError`.
The `CommonError` use the number as error code.

* Members:
  * message: the error message.
  * code: the error code.
* Methods: return true if the error instance is this error type.
  * ok()
  * notFound()
  * ....
  * invalidFormat()
* Class Methods:
  * `createErrorClass(aType: string, aErrorCode?: number, ParentErrorClass=CommonError): typeof CommonError`
  * CommonError.isOk(err)
  * CommonError.isNotFound(err)
  * ...

the error codes:

* CommonError.Ok              = 0
* CommonError.NotFound        = 1
* CommonError.Corruption      = 2
* CommonError.NotSupported    = 3
* CommonError.InvalidArgument = 4
* CommonError.IO              = 5
* CommonError.NotOpened       = 6
* CommonError.InvalidType     = 7
* CommonError.InvalidFormat   = 8


## Other Error Classes

* Errors.NotFoundError
* Errors.CorruptionError
* Errors.NotSupportedError/NotImplementedError
* Errors.InvalidArgumentError
* Errors.IOError
* Errors.NotOpenedError
* Errors.InvalidTypeError
* Errors.InvalidFormatError


## Extends the AbstractError

use the `createErrorClass` function can extend the AbstractError.

`createErrorClass(typeName, errorCode?: number|string, parentErrorClass?: typeof AbstractError): typeof AbstractError`

__arguments__

* `typeName` *(string)*: the error type name, the first character must be upper case.
* `errorCode`: *(number|string)*: the optional error code, it should be not equal 0 if it's a number.
* `parentErrorClass`: *(class)*:  the optional parent error class. defaults to `AbstractError`.

__return__

* the new error class


### Usage

```js
import {CommonError, Errors, createCommonErrorClass} from 'abstract-error';

const NotFoundError = Errors.NotFoundError
const AlreadyReadError = createCommonErrorClass('AlreadyRead', 10000)

const err = new AlreadyReadError('already read over error.')

assert.ok(CommonError.isAlreadyRead(err))
assert.ok(AlreadyReadError.isAlreadyRead(err))
assert.ok(err.alreadyRead())
assert.equal(err.message, 'already read over error.')
assert.equal(err.code, 10000)

```


