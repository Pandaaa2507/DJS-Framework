'use strict';

const FunctionHandler = require('../structures/FunctionHandler');

function CreateFunction() {

    let BaseStructure = {
        'type': 'function',
        'exec': function(client) {
            return;
        },
        'name': null,
        'options': {
            'repeat': {},
        }
    };
    let _t = this;

    /**
     * @param {Discord.Client} client
     * @param {String} Arguments Given arguments at call (Only available with the call() function)
    */
    function funcHandler(client, ...Arguments) {};

    /**
     * @param {funcHandler} FunctionHandeler Sets the Function Handler
    */
    this.setExec = function(FunctionHandeler) {
        BaseStructure.exec = FunctionHandeler;
        return _t;
    };

    /**
     * @param {String} Arguments 
    */
    this.call = function(...Arguments) {
        BaseStructure.options.repeat = {
            'type': 'schedule',
            'schedule': Schedule,
        };
        return _t;
    };

    /**
     * @param {String} FunctionName Sets the Name of the Function
    */
    this.setName = function(FunctionName) {
        BaseStructure.name = FunctionName;
        return _t;
    };

    /**
     * @param {Number} IntervalDuration Interval Duration in ms
    */
    this.setInterval = function(IntervalDuration) {
        BaseStructure.options.repeat = {
            'type': 'interval',
            'duration': IntervalDuration,
        };
        return _t;
    };

    /**
     * @param {Array} Schedule 
    */
    this.setSchedule = function(Schedule) {
        BaseStructure.options.repeat = {
            'type': 'schedule',
            'schedule': Schedule,
        };
        return _t;
    };

    /**
     * Disables the Function
    */
    this.disable = function() {
        BaseStructure.enabled = false;
        return _t;
    };

    this._func = BaseStructure;

};

class CreateFunction {

    constructor() {
        this.enabled = true;
        this.type = 'function';
        this.#exec = function(client) {};
        this.name = null;
        this.repeat = null;
    }

    /**
     * Set the function handler
     * @param {FunctionHandler} handler 
     */
    setExec(handler) {

    }

    /**
     * Disabled the function
     */
    disable() {

    }

}

new CreateFunction()

module.exports = CreateFunction;