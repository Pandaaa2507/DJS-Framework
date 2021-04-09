const Dirs = require('./Dirs');
const fs = require('fs');

module.exports = {};

/**
 * Get storage from a guild
 * @param {String} guildID The guild's id
 * @param {String} storageName The storage name to use (default: guild)
 * @returns {Object} Saved storage data
 */
module.exports.getGuildStorage = function(guildID, storageName) {
    let p = `${Dirs.guilds}/${guildID}/${storageName || 'guild'}.json`;
    if(!fs.existsSync(p)) {
        fs.appendFileSync(p, '{}');
    }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
};

/**
 * Update storage for a guild
 * @param {String} guildID The guild's id
 * @param {Object} storageData The storage data so save
 * @param {String} storageName The storage name to use (default: guild)
 */
module.exports.updateGuildStorage = function(guildID, storageData, storageName) {
    let p = `${Dirs.guilds}/${guildID}/${storageName || 'guild'}.json`;
    return fs.writeFileSync(p, JSON.stringify(storageData, null, 4));
};

/**
 * Get storage from a user
 * @param {String} userID The user's id
 * @param {String} storageName The storage name to use (default: user)
 * @returns {Object} Saved storage data
 */
module.exports.getUserStorage = function(userID, storageName) {
    let p = `${Dirs.users}/${userID}/${storageName || 'user'}.json`;
    if(!fs.existsSync(p)) {
        fs.appendFileSync(p, '{}');
    }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
};

/**
 * Update storage for a user
 * @param {String} userID The user's id
 * @param {Object} storageData The storage data so save
 * @param {String} storageName The storage name to use (default: user)
 */
module.exports.updateUserStorage = function(userID, storageData, storageName) {
    let p = `${Dirs.users}/${userID}/${storageName || 'user'}.json`;
    return fs.writeFileSync(p, JSON.stringify(storageData, null, 4));
};