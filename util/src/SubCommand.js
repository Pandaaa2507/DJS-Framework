const Discord = require('discord.js');

/**
 * Defines a new SubCommand
*/
module.exports = function() {

    let BaseStructure = {
        'enabled': true,
        'type': 'subcommand',
        'exec': function(util, client, msg, args) {
            return;
        },
        'options': {
            'permissionLevel': 0,
            'cooldown': 2
        }
    };

    /**
     * @param {Object} util
     * @param {Discord.Client} client 
     * @param {Discord.Message} msg 
     * @param {Array} args 
    */
    function cmdHandler(util, client, msg, args) {};
    
    /**
     * @param {cmdHandler} SubCommandHandeler Sets the SubCommand Handler
    */
    this.setExec = function(SubCommandHandeler) {
        BaseStructure.exec = SubCommandHandeler;
    };

    /**
     * @param {Number} CooldownCuration Sets the Cooldown duration of the SubCommand
    */
    this.setCooldown = function(CooldownCuration) {
        BaseStructure.options.cooldown = CooldownCuration;
    };

    /**
     * @param {Number} PermissionLevel Sets the Permission Level of the SubCommand
    */
    this.setPermissionLevel = function(PermissionLevel) {
        BaseStructure.options.permissionLevel = PermissionLevel;
    };

    /**
     * Disables the SubCommand
    */
    this.disable = function() {
        BaseStructure.enabled = false;
    };

    /**
     * @param {Object} util
     * @param {Discord.Client} client 
     * @param {Discord.Message} msg 
     * @param {Array} args 
    */
    this.exec = function(util, client, msg, args) {
        return BaseStructure.exec(util, client, msg, args);
    };

    this._scmd = BaseStructure;

};