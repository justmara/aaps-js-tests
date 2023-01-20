const assert = require('assert');
const { mockLog, restoreLog, testIt, findInLog } = require('./common.js');
require('chai').should();

const data = require('./data/third.js')

describe('test set with third', function() {

  describe('third step', function() {
    before(mockLog);
    after(restoreLog);
    let result = {}
    
    it("should pass", function() {
      result =  testIt(data);
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