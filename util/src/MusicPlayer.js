'use strict';

const Discord = require('discord.js');
const yt = require('ytdl-core');
const Stream = require('stream');
const cp = require('child_process');

let DJSF_StreamObject = {type: '', info: {}, stream: Stream.Readable};
let DJSF_PlayStreamOptionsObject = {bitrate: 64, filter: ''};
let DJSF_DispatcherObject = {dispatcher: new Discord.StreamDispatcher, connection: new Discord.VoiceConnection, info: {}};

class DJSF_MusicPlayer {

    /**
     * Create a Music Player
     * @param {Discord.Message} msg Message sent by a user (required)
     */
    constructor(msg) {
        if(!msg instanceof Discord.Message) {
            throw new Error('no message provided!');
        }
    }

    /**
     * available audio filters for a play steam
     * * `none`: no audio filter
     * * `8d`: moving, multi Dimensional Audio
     * * `bassboost`: stronger bass, lower treble
     * @typedef {String} DJSF_AudioFilter
     */

    /**
     * Join a users voice channel
     * @returns {Discord.VoiceChannel}
     */
    JoinVoice = async function() {
        let chan = msg.member.voice.channel;
        if(!chan || chan.type !== 'voice') {
            return;
        } else if(chan.full) {
            return;
        } else if(chan.joinable) {
            return
        } else if(chan.speakable) {
            return;
        }
        await chan.join();
        return chan;
    }
        
    /**
     * Create an YouTube stream
     * @param {String} video YouTube video link/id
     * @returns {DJSF_StreamObject} Object with MIME type, video info and play stream
     */
    YouTubeStream = async function(video) {

        let ytid = yt.getVideoID(video);
        let ytl = `https://www.youtube.com/watch?v=${ytid}`;
        let yts = yt(ytl, {
            'dlChunkSize': 1024 * 256,
            'liveBuffer': 1000 * 10,
            'format': 'highestaudio',
        });

        let { info, format } = await new Promise(res => yts.on('info', (info, format) => res({info, format})));

        let videoInfo = {
            channel: {
                id: info.videoDetails.author.id,
                name: info.videoDetails.author.name || info.videoDetails.author.user,
                url: info.videoDetails.author.user_url || info.videoDetails.author.channel_url,
                avatar: info.videoDetails.author.avatar,
                verified: info.videoDetails.author.verified,
                subscribers: info.videoDetails.author.subscriber_count,
            },
            title: info.videoDetails.title,
            duration: Number(info.videoDetails.lengthSeconds),
            keywords: info.videoDetails.keywords,
            description: info.videoDetails.description.simpleText || info.videoDetails.shortDescription,
            uploaded: new Date(info.videoDetails.publishDate || info.videoDetails.uploadDate),
            id: ytid,
            url: ytl,
            urlShort: `https://youtu.be/${ytid}`,
            views: info.videoDetails.viewCount,
            ratings: {
                likes: info.videoDetails.likes,
                dislikes: info.videoDetails.dislikes,
                average: info.videoDetails.averageRating,
            }
        };
        
        return {
            type: format.container === 'webm' ? 'webm/opus' : 'unknown',
            info: videoInfo,
            stream: yts,
        };

    }

    /**
     * Play an input stream
     * @param {Stream.Readable|DJSF_StreamObject} stream Input stream or object
     * @param {DJSF_PlayStreamOptionsObject} options Filter for cool audio effects
     * @returns {DJSF_DispatcherObject} Object with dispatcher and stream info
     */
    PlayStream = function(stream, options) {
        
        let vc = msg.guild.voice.connection;
        if(!vc) {
            return {info: null, dispatcher: null, channel: null};
        }

        if(typeof options === 'object' && options.filter !== 'none') {
            var proc = cp.spawn(`${ffmpegPath}`, [
                '-re', '-i', 'pipe:0',
                '-af', `${options.filter}`,
                '-b:a', `${options.bitrate || 96}K`,
                '-f', 'opus', 'pipe:1',
            ]);
            proc.on('error', () => {});
            stream.type = 'ogg/opus';
        }

        let playStream = proc !== undefined ? proc.stdout : stream.stream;

        let dispatcher = vc.play(playStream, {type: stream.type || 'unknown'});
        return {info: stream.info || null, dispatcher, channel: vc};

    }

    /**
     * Get an Audio Filter
     * @param {DJSF_AudioFilter} filter The filter name
     * @returns {String} Audio filter
     * @example getFilter('bassboost')
     */
    getFilter = function(filter) {
        if(filter === 'none') {
            return 'none';
        } else if(filter === '8d') {
            return 'apulsator=hz=0.1';
        } else if(filter === 'bassboost') {
            return 'treble=g=-10:f=500,bass=g=5:f=80';
        } else {
            return null;
        }
    }

}

module.exports = DJSF_MusicPlayer;