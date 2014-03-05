var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var paths = process.cwd().split(path.sep);
var settings = require(path.join(path.sep, paths[1], paths[2], paths[3], 'setting.js'));

var server = require.main.exports.server;

var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {

    // クライアント側からの投稿イベントを受け取る。
    socket.on('tokoEvent', function(msg, userName) {
        // 全員に投稿内容を送る
        io.sockets.emit('tokoComment', msg, userName);
    });

    // クライアント側からの退出イベントを受け取る。
    socket.on('exitEvent', function(userName) {
        // 自分以外のすべてのクライアントに退出情報を送る
        socket.broadcast.emit('exitComment', userName);
    });

    // クライアント側からの入室イベントを受け取る。
    socket.on('enterEvent', function(userName) {
        // 自分以外のすべてのクライアントに入室情報を送る
        socket.broadcast.emit('enterComment', userName);
    });


});

server.listen(settings.port);