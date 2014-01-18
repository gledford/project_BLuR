/*
var http = require('http');
var url = require("url");

function start() {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request received for " + pathname);
	    response.writeHead(200, {'Content-Type': 'text/plain'});
	    response.write('Hello World\n');
	    response.end();
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}


exports.start = start;
*/
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');