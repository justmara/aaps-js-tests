const assert = require('assert');
const { mockLog, restoreLog, testIt, findInLog, setDebug } = require('./common.js');
require('chai').should();

const first = require('./data/first.js')
const uamPlusFirst = require('./data/uam-plus-first.js')

//setDebug(true);

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

  describe('uam+', function() {
    before(mockLog);
    after(restoreLog);
    let result = {}

    it("should pass", function() {
      result =  testIt(uamPlusFirst);
      result.should.be.a('object')
      result.reason.should.be.a('string')
    });

    it("Prediction must be UAM", function() {
      findInLog('sens_predType:').should.equal('sens_predType: UAM')
    });

    it("ENW must be 'Off'", function() {
      result.reason.should.match(/ENW\: Off/)
    });
  });
});