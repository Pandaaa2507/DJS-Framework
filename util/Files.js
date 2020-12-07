const Dirs = require('./Dirs');
const path = require('path');
const fs = require('fs');

module.exports = {};

let dg = `${Dirs.data}/default_guild.json`;
let du = `${Dirs.data}/default_user.json`;

module.exports.getGuild = function(guildID) {
    let p = `${Dirs.guilds}/${guildID}/guild.json`;
    if(!fs.existsSync(p)) {
        let pb = path.dirname(path.join(p));
        if(!fs.existsSync(pb)) {
            fs.mkdirSync(pb);
        }
        let f = fs.readFileSync(dg, 'utf8');
        fs.appendFileSync(p, f);
    }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
};
module.exports.updateGuild = function(guildID, guildData) {
    let p = `${Dirs.guilds}/${guildID}/guild.json`;
    return fs.writeFileSync(p, JSON.stringify(guildData, null, 4));
};
module.exports.createGuildBackup = function(guildID, guildData) {
    let p = `${Dirs.users}/${guildID}/backup.json`;
    if(!fs.existsSync(p)) {
        let pb = path.dirname(path.join(p));
        if(!fs.existsSync(pb)) {
            fs.mkdirSync(pb);
        }
        fs.appendFileSync(p, '');
    }
    return fs.writeFileSync(p, JSON.stringify(guildData, null, 4));
};
module.exports.loadGuildBackup = function(guildID) {
    let p = `${Dirs.users}/${guildID}/backup.json`;
    return fs.readdirSync(p, 'utf8');
};

module.exports.getUser = function(userID) {
    let p = `${Dirs.users}/${userID}/user.json`;
    if(!fs.existsSync(p)) {
        let pb = path.dirname(path.join(p));
        if(!fs.existsSync(pb)) {
            fs.mkdirSync(pb);
        }
        let f = fs.readFileSync(du, 'utf8');
        fs.appendFileSync(p, f);
    }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
};
module.exports.updateUser = function(userID, userData) {
    let p = `${Dirs.users}/${userID}/user.json`;
    return fs.writeFileSync(p, JSON.stringify(userData, null, 4));
};
module.exports.createUserBackup = function(userID, userData) {
    let p = `${Dirs.users}/${userID}/backup.json`;
    if(!fs.existsSync(p)) {
        let pb = path.dirname(path.join(p));
        if(!fs.existsSync(pb)) {
            fs.mkdirSync(pb);
        }
        fs.appendFileSync(p, '');
    }
    return fs.writeFileSync(p, JSON.stringify(userData, null, 4));
};
module.exports.loadUserBackup = function(userID) {
    let p = `${Dirs.users}/${userID}/backup.json`;
    return fs.readdirSync(p, 'utf8');
};