'use strict';

const CommandHandler = require('../structures/CommandHandler');

class CreateCommand {

    constructor() {

        this.enabled = true;
        this.type = 'command';
        this.exec = function(client, msg, args) {};
        this.name = null;
        this.description = 'Makes something special 🌟';
        this.aliases = [];
        this.permissionLevel = 0;
        this.cooldown = 2;

    }

    /**
     * Set the command handler
     * @param {CommandHandler} handler 
     */
    setExec(handler) {
        this.exec = handler;
        return this;
    }

    /**
     * Set the name of the command
     * @param {String} name 
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * Set the description of the command
     * @param {String>} description 
     */
    setDescription(description) {
        this.description = description;
        return this;
    }

    /**
     * Add an alias for the command
     * @param {String} alias 
     */
    addAlias(alias) {
        this.aliases.push(alias);
        return this;
    }

    /**
     * Set all aliases for the command
     * @param {Array<String>} aliaslist 
     */
    setAliases(aliaslist) {
        this.aliases = aliaslist;
        return this;
    }

    /**
     * Set the cooldown duration for the command
     * @param {Number} duration 
     */
    setCooldown(duration) {
        this.cooldown = duration;
        return this;
    }

    /**
     * Set permission level required to use the command
     * @param {Number} level 
     */
    setPermissionLevel(level) {
        this.permissionLevel = level;
        return this;
    }

    /**
     * Disables the command
     */
    disable() {
        this.enabled = false;
        return this;
    }

}

module.exports = CreateCommand;