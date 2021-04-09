const Logger = require('./Logger');
require('./functions/pad');

try {
    require('discord.js');
    require('request');
    require('express');
    require('ytdl-core');
    require('@discordjs/opus');
} catch (e) {
    console.log([
        `[${Logger.colors.red}ERROR${Logger.colors.white}]`,
        'default modules not installed!'
    ].join(' '));
    console.log([
        `[${Logger.colors.blue}INFO${Logger.colors.white}]`,
        `please run ${Logger.colors.green}npm run modules ${Logger.colors.white}`,
    ].join(' '));
    console.log([
        `[${Logger.colors.blue}INFO${Logger.colors.white}]`,
        `to install additional modules, run ${Logger.colors.green}npm run recommended ${Logger.colors.white}`,
    ].join(' '));
    process.exit(0);
}

const Log = process.Logger = new Logger();

module.exports = {
    'Cluster': require('cluster'),
    'Bot': require('./Manager'),
    'Logger': Log,
};