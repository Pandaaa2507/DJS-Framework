const Log = require('./util/scripts/Logger');
const Logger = new Log();

const Files = require('./util/Files');

module.exports = {
    'Cluster': require('cluster'),
    'Config': () => require('./config'),
    'Command': require('./util/scripts/Command'),
    // 'SubCommand': require('./util/scripts/SubCommand'),
    'Function': require('./util/scripts/Function'),
    'Dirs': require('./util/Dirs'),
    'Files': require('./util/Files'),
    'MusicPlayer': require('./util/scripts/MusicPlayer'),
    'Log': Logger.Log,
};