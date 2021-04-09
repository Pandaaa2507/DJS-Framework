'use strict';

const Logger = process.Logger;
const Manager = process.Manager;
const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
server.port = 4567;
const io = SocketIO(server, {
    'path': '/',
    'serveClient': false,
    'pingInterval': 2500,
    'pingTimeout': 1000,
    'cookie': false,
});

let activeShards = 0;
let loggedShards = 0;

io.on('connection', (socket) => {

    let ShardData = {
        'id': -1,
    };

    socket.on('disconnect', () => {
        activeShards--;
        loggedShards--;
        Logger.Error(`Shard ${ShardData.id}: disconnected!`);
        Manager.createShard(ShardData.id);
    });

    socket.on('shardReady', (ShardID) => {
        activeShards++;
        ShardData.id = ShardID;
        Logger.Log(`Shard ${ShardData.id}: connected!`);
    });

    socket.on('ready', (BotName) => {
        loggedShards++;
        Logger.Log(`Shard ${ShardData.id}: logged in as ${BotName}!`);
    });

    socket.on('login', (success, message) => {
        if(success) {
            loggedShards++;
            Logger.Log(`Shard ${ShardData.id}: logged in as ${message}!`);
        } else {
            Logger.Error(`Shard ${ShardData.id}: failed logging in: ${message}!`);
        }
    });

    socket.on('loaded', () => {
        Logger.Log(`Shard ${ShardData.id}: finished loading!`);
    });

    socket.on('command', (cmd, status, args, author, ping, error) => {
        Logger.Log(`Shard ${ShardData.id}: ${cmd} (${status}) "${args}" from ${author} took ${ping || -1}ms`);
        if(error) {
            Logger.Error(`an error occured while performing: ${cmd} "${args}" for ${author}`);
            Logger.Error(`err: ${error.message} (${error.code})\n STACK: ${error.stack}`);
        }
    });

    socket.on('log', (text) => Logger.Log(`Shard ${ShardData.id}: ${text}`));

});

server.listen(server.port, () => {
    Logger.Info(`WebServer started at Port ${server.port}!`);
});

module.exports = {
    'Socket': io,
    'App': app,
};