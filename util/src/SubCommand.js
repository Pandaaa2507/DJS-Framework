'use strict';

const CommandHandler = require('../structures/CommandHandler');

class CreateCommand {

    constructor() {

        this.enabled = true;
        this.type = 'subcommand';
        this.exec = function(client, msg, args) {};
        this.name = null;
        this.description = 'Makes something special 🌟';
        this.aliases = [];

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
     * Disables the subcommand
     */
    disable() {
        this.enabled = false;
        return this;
    }

}

module.exports = CreateCommand;