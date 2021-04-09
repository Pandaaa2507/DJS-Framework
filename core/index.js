const DJSF = require('../DJSF');
const Discord = require('discord.js');

const config = DJSF.Files.config();
const client = global.client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({'status': 'online', 'activity': {'name': 'DJSF by Pandaaa'}});
});

client.on('message', (msg) => {
    msg.reply('it works!');
});

client.login(config.token);

async function playMusic() {

    const Player = new DJSF.MusicPlayer(msg);

    let VoiceChannel = await Player.JoinVoice();

    let YouTubeStream = await Player.YouTubeStream('https://www.youtube.com/watch?v=tIy5OtJ7Xpo');

    let PlayStream = Player.PlayStream(YouTubeStream, {bitrate: 64, filter: Player.getFilter('bassboost')});

}