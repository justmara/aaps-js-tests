const assert = require('assert');
const { mockLog, restoreLog, testIt, findInLog, setDebug } = require('./common.js');
require('chai').should();

const uamPlus00 = require('./data/uam-plus-00.js')
const uamPlus01 = require('./data/uam-plus-01.js')

//setDebug(true);

describe('uam+ tests set', function() {
  describe('00', function() {
    before(mockLog);
    after(restoreLog);
    let result = {}

    it("should pass", function() {
      result =  testIt(uamPlus00);
      result.should.be.a('object')
      result.reason.should.be.a('string')
    });

    it("Prediction must be UAM+", function() {
      findInLog('sens_predType:').should.equal('sens_predType: UAM+')
    });

    it("ENW must be 'On'", function() {
      result.reason.should.match(/ENW\: On/)
    });
  });


  describe('01', function() {
    before(mockLog);
    after(restoreLog);
    let result = {}

    it("should pass", function() {
      result =  testIt(uamPlus01);
      result.should.be.a('object')
    });

    it("Prediction must be UAM+", function() {
      findInLog('sens_predType:').should.equal('sens_predType: UAM+')
    });
  });
});