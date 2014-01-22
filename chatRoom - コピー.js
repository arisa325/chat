var fs = require('fs');
var http = require('http');
var settings = require('../setting.js');

var server = require.main.exports.server;

var io = require('socket.io').listen(server);

// io.socketsの接続
io.sockets.on('connection', function (socket) {
	var query = require.main.exports.query;
	// bbb他ユーザに入室情報を送信
	socket.broadcast.emit('enter', query.userName);

	socket.on('msg', function (data) {
		io.sockets.emit('msg', data);
	});

	socket.on('exit', function (data) {
		//aaa 他ユーザに退室情報を送信Test
		socket.broadcast.emit('exit', query.userName);
		//aaa 他ユーザに退室情報を送信Test
	});
});
