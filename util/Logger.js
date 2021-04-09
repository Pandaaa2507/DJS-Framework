const toDate = require('./functions/toDate');
const toTime = require('./functions/toTime');

function Logger() {

    let startdate = new Date();

    function getStartDate() {
        return startdate;
    }

    this.toTime = toTime;
    this.toDate = toDate;
    this.getCoreStartDate = getStartDate;

    for(let i = 0; i < 2; i++) {
        process.argv.shift();
    }

    let testMode = false;

    for(let i = 0; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if(arg === '--test') {
            testMode = true;
        } if(arg === '--newlog') {
            goodLogger = true;
        }
    }

    this.isTestMode = function() {
        return testMode;
    }

    function prefix() {
        let d = new Date();
        return `[${Logger.colors.yellow}${toTime(d)} ${Logger.colors.magenta}${toDate(d)}${Logger.reset}]`;
    }

    this.Log = function (text) {
        console.log(`${prefix()} ${Logger.colors.green}LOG${Logger.reset}   | ${text}`);
    };

    this.Info = function (text) {
        console.log(`${prefix()} ${Logger.colors.cyan}INFO${Logger.reset}  | ${text}`);
    };

    this.Error = function (text) {
        console.log(`${prefix()} ${Logger.colors.red}ERROR${Logger.reset} | ${text}`);
    };

};

Logger.reset = '\x1b[0m';
Logger.colors = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};
Logger.backgrounds = {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
};

module.exports = Logger;