const DJSF = require('../DJSF');
const Discord = require('discord.js');
const Config = require('../config');
const Events = require('events');

const Manager = process.Manager = new Discord.ShardingManager(`${DJSF.Dirs.main}/core/index.js`, {
    'mode': 'process',
    'respawn': true,
    'totalShards': 'auto',
    'shardArgs': process.argv,
    'token': Config.bot.token,
});

const Handler = new Events.EventEmitter();

class DJSF_Manager {

    constructor() {
        
    }

    /**
     * Start the Discord bot
     * @param {number} shards The shard count to spawn
     * @returns {void}
    */
    start(shards) {
        Manager.spawn(shards || 'auto', 2500)
        .then(shards => Handler.emit('start', shards))
        .catch(error => process.Logger.Error(`Invalid token provided!`));
    }

    /**
     * 
     * @param {CallableFunction} callback 
     * @returns 
     */
    onStart(callback) {
        Handler.addListener('start', callback);
    }

    /**
     * @param {CallableFunction} callback 
    */
    onShard(callback) {
        Manager.on('shardCreate', callback);
    }

}

module.exports = DJSF_Manager;