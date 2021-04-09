'use strict';

const Discord = require('discord.js');

/**
 * Create a cool looking message
 * @param {String} description 
 * @param {String} emoji
 */
module.exports = (description, emoji) => new Discord.MessageEmbed({'description': `${emoji}${description}`});