const DJSFU = require('./util');
const Config = require('./config');

const Bot = new DJSFU.Bot(Config.bot.token);

Bot.start();

Bot.onStart(function(shards) {
    DJSFU.Logger.Log(`Core: Launched ${shards.size} shards!`);
});