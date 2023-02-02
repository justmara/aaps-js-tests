const assert = require('assert');
const { mockLog, restoreLog, testIt, findInLog, setDebug, parseLog, logFields } = require('./common.js');
require('chai').should();

//setDebug(true);

describe('parse AndroidAps.log', function() {
    before(mockLog);
    after(restoreLog);
    let result = {}

    it("parsed", function() {
      result = parseLog('data/first.log');
      result.should.be.a('object');
      result.parsed.should.equal(true);
    });

    it("glucose_status is set", function() {
        result.glucose_status.should.be.a('object');
    });

    it("iob_data is set", function() {
        result.iob_data.should.be.a('array');
    });

    it("currenttemp is set", function() {
        result.currenttemp.should.be.a('object');
    });

    it("profile is set", function() {
        result.profile.should.be.a('object');
    });

    it("meal_data is set", function() {
        result.meal_data.should.be.a('object');
    });

    it("autosens_data is set", function() {
        result.autosens_data.should.be.a('object');
    });

    it("currenttime is set", function() {
        result.currenttime.should.equal(1672149403794);
    });

    it("variant is 'latest'", function() {
        result.profile.variant.should.equal('latest');
    });
});