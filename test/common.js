const sinon = require('sinon');
const aaps_tbf = require('../../AndroidAPS/app/src/main/assets/EN/basal-set-temp.js')
const aaps = require('../../AndroidAPS/app/src/main/assets/EN/scaled/determine-basal.js')
const ReadLines = require('n-readlines');
const originalLog = console.log;
const path = require('path');
const root = __dirname + '/';
const logFields = {
    "glucose_status": "Glucose status: ",
    "iob_data"      : "IOB data:       ",
    "currenttemp"   : "Current temp:   ",
    "profile"       : "Profile:        ",
    "meal_data"     : "Meal data:      ",
    "autosens_data" : "Autosens data:  ",
    "currenttime"   : 'CurrentTime: '
}

let log = [];
let debug = false;

let common = {
    mockLog: function() {
        log = [];
        sinon.stub(console, 'log').callsFake(logIt);
        sinon.stub(console, 'error').callsFake(logIt);
    },
    restoreLog: function() {
        console.log.restore(); 
        console.error.restore(); 
    },
    testIt: function(data) {
        return aaps(data.glucose_status, data.currenttemp, data.iob_data, data.profile, data.autosens_data, data.meal_data, aaps_tbf, true, null, data.currenttime, true);
    },      
    findInLog: function (key) {
        return log.find(x => typeof x === 'string' && x.startsWith(key))
    },
    setDebug: function (value) {
        debug = value;
    },
    parseLog : function(fileName) {
        let reader = new ReadLines(root + fileName);
        let result = {};
        let read;

        while ((read = reader.next())) {
            let line = read.toString('utf8');
            for(var field in logFields) {
                var value = logFields[field];
                if(line.match(value)) {
                    let json = JSON.parse(line.substring(line.indexOf(value) + value.length));
                    if (field == 'profile') json.variant = "latest";
                    result[field] = json;
                }
            }
        }

        result.parsed = true;
        return result;
    },
    logFields : logFields
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