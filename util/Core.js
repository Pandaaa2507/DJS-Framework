const DJSF = require('../DJSF');
require('./functions/pad');

const Discord = require('discord.js');
const fs = require('fs');
const config = DJSF.Config();

const client = new Discord.Client({
    'ws': {
        'compress': true,
    },
    'retryLimit': 5,
    'sync': true,
    'partials': ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.config = config;
client.color = config.bot.color;
client.socket = require('socket.io-client')(`http://localhost:4567`, {
    'path': '/',
    'autoConnect': true,
    'reconnection': false,
});

function quit(code) {
    client.destroy();
    process.exit(code);
}

client.socket.on('disconnect', () => quit(-1));
client.socket.emit('shardReady', client.shard.ids);

client.on('raw', (packet) => {
    if(!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        return;
    }
    const channel = client.channels.cache.get(packet.d.channel_id);
    if(channel.messages.has(packet.d.message_id)) {
        return;
    }
    channel.fetchMessage(packet.d.message_id)
    .then(message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        if(reaction) {
            reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        } if(packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        } else if(packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

// ------------------------------------------------------------------------------------------------------------------

function load() {
    loadCommands();
    client.commands = {};
    client.functions = {};
}
function loadCommands() {
    fs.readdir(DJSF.Dirs.commands, (err, files) => {
        if(err) {
            throw err;
        }
        let JSfiles = files.filter(f => !f.startsWith('_') && f.split('.').pop() === 'js' || fs.statSync(`${DJSF.Dirs.commands}${f}`).isDirectory() === true);
        for(let i = 0; i < JSfiles.length; i++) {
            let JSfile = JSfiles[i];
            let props = require(`./commands/${JSfile}`)._cmd;
            if(props.enabled === true) {
                client.commands[props.name] = props;
                for(let i = 0; i < props.aliases.length; i++) {
                    if(!client.commands[props.aliases[i]]) {
                        client.commands[props.aliases[i]] = props;
                    }
                }
            }
        }
        return loadFunctions();
    });
}
function loadFunctions() {
    fs.readdir(DJSF.Dirs.functions, (err, files) => {
        if(err) {
            throw err;
        }
        let JSfiles = files.filter(f => f.split('.').pop() === 'js' && !f.startsWith('_'));
        for(let i = 0; i < JSfiles.length; i++) {
            let JSfile = JSfiles[i];
            let props = require(`./functions/${JSfile}`)._func;
            client.functions[props.name] = props;
        }
        return login();
    });
}
function login() {
    client.socket.emit('loaded');
    try {
        client.login(config.bot.token)
        .then(c => client.socket.emit('login', true, client.user.username))
        .catch(e => client.socket.emit('login', false, e.message));
    } catch (e) {
        DJSF.Log(e);
    }
}
load();

client.on('ready', () => {
    client.socket.emit('ready', client.user.tag);
    for(let func in client.functions) {
        client.functions[func].exec(client);
    }
});
client.on('disconnect', () => process.exit(-1));

// ------------------------------------------------------------------------------------------------------------------

const langs = require('../data/lang');
client.langs = langs;
client.setInterval(() => client.sweepMessages(900), 1000 * 60);

let cooldowns = {};
client.on('message', (msg) => {

    let serverFile = DJSF.Files.guild(msg.guild.id);
    let prefix = DJSF.Bot.prefix || serverFile.prefix;

    if(!msg.content.startsWith(prefix) && msg.author.bot || msg.channel.type === 'dm') {
        return;
    }

    let list = msg.content.split(' ');
    let cmd = list[0].toString().toLowerCase();
    let args = list.slice(1);

    let cmdFile = client.commands[cmd.slice(prefix.length)];
    let ping = Math.round(client.ws.ping);
    let user = msg.author.tag;

    client.lang = langs[serverFile.lang] || langs.en;

    if(cmdFile) {
        try {
            cooldowns[msg.author.id] = cooldowns[msg.author.id] || {};
            cooldowns[msg.author.id][cmdFile.name] = cmdFile.options.cooldown;

            msg.author.avatarLink = msg.author.avatarURL({
                'size': 128,
                'format': 'png'
            });
            msg.cmd = cmdFile.name;

            cmdFile.exec(client, msg, args);
            client.socket.emit('command', cmd, 200, args, user, ping, false);

            let resetCooldown = setInterval(changeCooldown, 1000);
            function changeCooldown() {
                if(cooldowns[msg.author.id][cmdFile.name] <= 0) {
                    delete cooldowns[msg.author.id][cmdFile.name];
                    clearInterval(resetCooldown);
                } else {
                    cooldowns[msg.author.id][cmdFile.name]--;
                }
            }
        } catch(e) {
            msg.channel.send('Es ist ein unerwarteter Fehler beim ausführen dieses Befehls aufgetreten!');
            client.socket.emit('command', cmd, 500, args, user, ping, {'code': e.code, 'message': e.message, 'stack': e.stack});
        }
    } else {
        client.socket.emit('command', cmd, 404, args, user, ping, false);
    }

});