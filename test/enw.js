const assert = require('assert');
const { mockLog, restoreLog, testIt, findInLog, setDebug, parseLog, debug } = require('./common.js');
require('chai').should();

//setDebug(true);

describe('ENW tests set', function () {
    describe('ENW-TT', function () {
        before(mockLog);
        after(restoreLog);
        let data = parseLog('data/EN-TT_ENW-off.log');
        let result = {}

        it("should pass", function () {
            result = testIt(data)
            result.should.be.a('object')
            result.reason.should.be.a('string')
        });

        it("Prediction must be UAM", function () {
            findInLog('sens_predType:').should.equal('sens_predType: UAM')
        });

        it("ENW-TT must be active", function () {
            result.reason.should.match(/EN-TT=/)
        });

        it("EN must be 'On'", function () {
            result.reason.should.match(/EN-.*: On/)
        });

        it("ENW must be 'On'", function () {
            result.reason.indexOf('ENW').should.be.above(0)
            result.reason.substring(result.reason.indexOf('ENW')).should.match(/ENW: On/)
        });
    });

    describe('ENW-TT @ delta 7, IOB trigger = 0', function () {
        before(mockLog);
        after(restoreLog);
        let data = parseLog('data/EN-TT_ENW-off.log');
        data.glucose_status.delta = 7;
        data.profile.ENWIOBTrigger = 0;
        let result = {}

        it("should pass", function () {
            result = testIt(data)
            result.should.be.a('object')
            result.reason.should.be.a('string')
            debug(result.reason)
        });

        it("Prediction must be UAM", function () {
            findInLog('sens_predType:').should.equal('sens_predType: UAM')
        });

        it("ENW-TT must be active", function () {
            result.reason.should.match(/EN-TT=/)
        });

        it("EN must be 'On'", function () {
            result.reason.should.match(/EN-.*: On/)
        });

        it("ENW must be 'On'", function () {
            result.reason.indexOf('ENW').should.be.above(0)
            result.reason.substring(result.reason.indexOf('ENW')).should.match(/ENW: On/)
        });
    });

});