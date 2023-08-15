import chai from 'chai';

const assert = chai.assert;
const should = chai.should();

import {CommonError, createCommonErrorClass as createErrorClass, Errors} from "../src/common-error";

describe("test CommonErrors", function() {
  it("test CommonError constants", function() {
    assert.equal(CommonError.Ok, 0);
    assert.equal(CommonError.NotFound, 1);
  });
  it("test CommonError Class Methods", function() {
    var err;
    err = new CommonError("", 1);
    assert.ok(CommonError.isNotFound(err), "should be notFound");
    assert.notOk(CommonError.isOk(err), "should not be ok");
    err.code = 0;
    assert.ok(CommonError.isOk(err), "should be ok");
  });
  it("test CommonError Classes", function() {
    var err;
    err = new Errors.NotFoundError();
    assert.instanceOf(err, CommonError);
    assert.equal(err.name, "NotFoundError");
    assert.ok(CommonError.isNotFound(err), "isNotFound should be notFound");
    assert.ok(err.notFound(), "err should be notFound");
    assert.notOk(CommonError.isOk(err), "should not be ok");
    err.code = 0;
    assert.ok(CommonError.isOk(err), "should be ok");
    assert.notOk(err.notFound(), "should not be notFound");
    err.code = null;
    assert.ok(err.notFound(), "default msg should be notFound");
  });
  it("test CommonError instance", function() {
    var err;
    err = new Errors.InvalidArgumentError("");
    assert.instanceOf(err, CommonError);
    assert.notOk(err.ok(), "should not be ok");
    assert.notOk(err.notFound(), "should not be notFound");
    assert.ok(err.invalidArgument(), "should be invalidArgument");
    assert.equal(err.message, "InvalidArgument");
    err = new Errors.InvalidArgumentError();
    assert.equal(err.message, "InvalidArgument");
  });
});

describe("test extend CommonError", function() {
  it("should add a new Error class to CommonError", function() {
    var ErrCls, err;
    ErrCls = createErrorClass("MyError", 1000);
    err = new ErrCls("already read over error.");
    assert.ok(CommonError.isMyError(err));
    assert.ok(err.myError());
    assert.equal(err.message, "already read over error.");
    assert.equal(err.code, 1000);
  });
  it("should add a new Error class to MyError", function() {
    var Error1, MyError, err;
    MyError = createErrorClass("MyError", 1000);
    Error1 = createErrorClass("Error1", 12, MyError);
    err = new Error1("already read over error.");
    assert.instanceOf(err, MyError);
    assert.equal(err.name, "Error1Error");
    assert.equal(err.message, "already read over error.");
    assert.equal(err.code, 12);
    assert.ok(MyError.isError1(err), "MyError.isError1");
    assert.ok(err.error1(), "err.error1");
  });
});
