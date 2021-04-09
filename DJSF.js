const Log = require('./util/Logger');
const Logger = new Log();

require('./util/functions/pad');

const Files = require('./util/Files');

module.exports = {
    'Cluster': require('cluster'),
    'Config': () => require('./config'),
    'Command': require('./util/src/Command'),
    'Function': require('./util/src/Function'),
    'Dirs': require('./util/Dirs'),
    'Files': require('./util/Files'),
    'MessageEmbed': require('./util/src/MessageEmbed'),
    'MusicPlayer': require('./util/src/MusicPlayer'),
    'Log': Logger.Log,
};