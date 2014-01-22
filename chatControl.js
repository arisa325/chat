var fs = require('fs');
var http = require('http');
var ejs = require('ejs');
var url = require('url');
var querystring = require('querystring');
var settings = require('../setting.js');  // 当ファイルからの相対パス3

console.log(settings);

var server = http.createServer(onRequest);
module.exports.server = server;

var query;

function onRequest(req, res) {
	console.log('------- onRequest -------');

	// パラメータを取得してページ表示3
	if (req.method == 'GET') {
		console.log('GET!!');
	  query = url.parse(req.url, true).query;
	  showPage(req, res);

	} else {
	
		console.log('POST!!');
	  var query = setQeuryString(req, res);

	}
}

server.listen(settings.port);

function setQeuryString(req, res) {
	var postData = '';
	req.on("readable", function () {
		postData += req.read();
	});
	req.on("end", function() {
		query = querystring.parse(postData)
		showPage(req, res);
	});
}

function showPage(req, res) {
	var path = req.url;
	console.log('Path = ' + path);
	module.exports.query = query;

	switch (path) {
		// ログイン画面を開く
		case '/':
			data = fs.readFileSync('./chatIndex.html');  // 相対パス指定時は実行ディレクトリからの相対パスとなる
			res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
			res.end(data);
			break;

		// チャットルームを開く
		case '/room':
			require('./chatRoom.js');
			ejsData = fs.readFileSync('./chatRoom.ejs', 'UTF-8');
			data = ejs.render(ejsData, {userName : query.userName});
			res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
			res.end(data);
			break;

		default:
			console.log('File ' + path + ' is not found!!');
			return;
			break;
	}
}
