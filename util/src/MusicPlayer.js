const DJSF = require('../../DJSF');
const Discord = require('discord.js');
const yt = require('ytdl-core');
const Stream = require('stream');

/**
 * 
 * @param {Discord.Message} msg 
 */
module.exports = function(msg) {

    /**
     * join voice channel of message owner
     * @returns {Discord.VoiceChannel}
     */
    this.join = async function() {
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
     * start playing a youtube url
     * @param {String} url 
     * @param {Object} options 
     */
    this.play = async function(url, options) {
        
        let vc = msg.guild.voice.connection;

        if(!vc) {
            return;
        }

        let ytid = yt.getVideoID(url);
        let ytl = `https://www.youtube.com/watch?v=${ytid}`;

        let info = await yt.getInfo(ytl, options);
        let format = yt.filterFormats(info.formats, (f) => f.hasAudio && !f.hasVideo && f.container === 'webm' && f.codecs === 'opus');
        
        let yts = yt(ytl, {
            'dlChunkSize': 1024 * 256,
            'liveBuffer': 1000 * 10,
            'format': format[0],
        }, options);

        let pass = new Stream.PassThrough();

        yts.pipe(pass);
        vc.play(pass, {'type': 'webm/opus'});

        let simpleInfo =  {
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

        return simpleInfo;

    }

}