import chai from 'chai';

const assert = chai.assert;
const should = chai.should();

import {AbstractError, createError} from "../src/abstract-error";

describe("test AbstractErrors", function() {
  it("test new AbstractError Class", function() {
    var err;
    err = new AbstractError("abstract error", 1);
    assert.instanceOf(err, AbstractError);
    assert.equal(err.code, 1);
    assert.equal(err.message, "abstract error");
  });
  it("test AbstractError Class", function() {
    var err;
    err = AbstractError("abstract error", 1);
    assert.instanceOf(err, AbstractError);
    assert.equal(err.code, 1);
    assert.equal(err.message, "abstract error");
  });
});

describe("test createError", function() {
  it("should add a new Error class to AbstractError", function() {
    var ErrCls, err;
    ErrCls = createError("MyError", 1000);
    err = new ErrCls("already read over error.");
    assert.ok(AbstractError.isMyError(err));
    assert.ok(err.myError());
    assert.equal(err.message, "already read over error.");
    assert.equal(err.code, 1000);
  });
  it("should add a new Error class to MyError", function() {
    var Error1, MyError, err;
    MyError = createError("MyError", 1000);
    Error1 = createError("Error1", 12, MyError);
    err = new Error1("already read over error.");
    assert.instanceOf(err, MyError);
    assert.equal(err.name, "Error1Error");
    assert.equal(err.message, "already read over error.");
    assert.equal(err.code, 12);
    assert.ok(MyError.isError1(err), "MyError.isError1");
    assert.ok(err.error1(), "err.error1");
  });
});
