### AbtractError [![Build Status](https://img.shields.io/travis/snowyu/abstract-error.js/master.png)](http://travis-ci.org/snowyu/abstract-error.js) [![npm](https://img.shields.io/npm/v/abstract-error.svg)](https://npmjs.org/package/abstract-error) [![downloads](https://img.shields.io/npm/dm/abstract-error.svg)](https://npmjs.org/package/abstract-error) [![license](https://img.shields.io/npm/l/abstract-error.svg)](https://npmjs.org/package/abstract-error) 

abstract error class with error code supports to create error class quickly.

# AbstractError Classes

## AbstractError

All Errors are derived from the AbstractError.

* Members:
  * message: the error message.
  * code: the error code.
* Methods:
  * ok()
  * notFound()
  * ....
  * invalidFormat()
* Class Methods:
  * AbstractError.isOk(err)
  * AbstractError.isNotFound(err)
  * ...

the error codes:

* AbstractError.Ok              = 0
* AbstractError.NotFound        = 1
* AbstractError.Corruption      = 2
* AbstractError.NotSupported    = 3
* AbstractError.InvalidArgument = 4
* AbstractError.IO              = 5
* AbstractError.NotOpened       = 6
* AbstractError.InvalidType     = 7
* AbstractError.InvalidFormat   = 8


## Other Error Classes:

* NotFoundError
* CorruptionError
* NotSupportedError/NotImplementedError
* InvalidArgumentError
* IOError
* NotOpenedError
* InvalidTypeError
* InvalidFormatError


## Extends the AbstractError

use the `createError` function can extend the AbstractError.

createError(typeName, errorCode[, parentErrorClass])

__arguments__

* typeName *(string)*: the error type name, the first character must be upper case.
* errorCode: *(number)*: the error code, it should be greater than 1000.
* parentErrorClass: *(class)*:  the optional parent error class. defaults to AbstractError.

__return__

* the error class


### Usage

```js


var Errors = require("abstract-error/Error")
var AbstractError = Errors.AbstractError
var createError = Errors.createError


var AlreadyReadError = createError('AlreadyRead', 10000)

var err = new AlreadyReadError("already read over error.")

assert.ok(AbstractError.isAlreadyRead(err))
assert.ok(AlreadyReadError.isAlreadyRead(err))
assert.ok(err.alreadyRead())
assert.equal(err.message, "already read over error.")
assert.equal(err.code, 10000)

```


