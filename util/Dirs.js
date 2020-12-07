const Main = require('../__');
const path = require('path');
module.exports = {};
module.exports.main = path.join(Main);
module.exports.util = path.join(module.exports.main + '/util/');
module.exports.data = path.join(module.exports.main + '/data/');
module.exports.guilds = path.join(module.exports.data + '/guilds/');
module.exports.users = path.join(module.exports.data + '/users/');
module.exports.core = path.join(module.exports.main + '/core/');
module.exports.commands = path.join(module.exports.core + '/commands/');
module.exports.functions = path.join(module.exports.core + '/functions/');