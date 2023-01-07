const sinon = require('sinon');
const aaps_tbf = require('../../AndroidAPS/app/src/main/assets/EN/basal-set-temp.js')
const aaps = require('../../AndroidAPS/app/src/main/assets/EN/scaled/determine-basal.js')
const originalLog = console.log;
let log = [];
let debug = false;

let common = {
    mockLog: function() {
        sinon.stub(console, 'log').callsFake(logIt);
        sinon.stub(console, 'error').callsFake(logIt);
    },
    restoreLog: function() {
        console.log.restore(); 
        console.error.restore(); 
        log = [];
    },
    testIt: function(data) {
        return aaps(data.glucose_status, data.currenttemp, data.iob_data, data.profile, data.autosens_data, data.meal_data, aaps_tbf, true, null, Date(data.currenttime), true);
    },      
    findInLog: function (key) {
        return common.log.find(x => typeof x === 'string' && x.startsWith(key))
    },
    log : log,
    debug: debug
}

function logIt(args) {
    if (typeof args === 'string') {
        args.split('\n').forEach(line => {
            line.split('; ').forEach(block => {
                block.split(', ').forEach(sub => {
                    log.push(sub);
                });
            });
        });
    }
    else if (Array.isArray(args)) {
        args.forEach(element =>  {
            logIt(element); 
        });
    }
    else assert.equal('warn', typeof(args));
    if (debug) originalLog(args)
}

module.exports = common