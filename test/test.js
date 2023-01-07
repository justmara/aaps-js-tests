const assert = require('assert');
const { mockLog, restoreLog, testIt, findInLog } = require('./common.js');
require('chai').should();

const first = require('./data/first.js')
const second = require('./data/second.js')

//common.debug = true;

describe('test set', function() {

  describe('first step', function() {
    before(mockLog);
    after(restoreLog);
    let result = {}

    it("should pass", function() {
      result =  testIt(first);
      result.should.be.a('object')
    });

    it("insulinReq should be 0", function() {
      assert.equal(0, result.insulinReq);
    });

    it("'ENactive' sould be true", function() {
      findInLog('ENactive:').should.equal('ENactive: true')
    });
  });

  describe('seconds step', function() {
    before(mockLog);
    after(restoreLog);
    let result = {}

    it("should pass", function() {
      result =  testIt(second);
      result.should.be.a('object')
    });

    it("insulinReq should be 0", function() {
      assert.equal(0, result.insulinReq);
    });

    it("'ENactive' sould be true", function() {
      findInLog('ENactive:').should.equal('ENactive: true')
    });
  });
});