const Discord = require('discord.js');

/**
 * 
 * @param {String} description 
 * @param {String} emoji
 */
module.exports = (description, emoji) => new Discord.MessageEmbed({'description': `${emoji}${description}`});