//this is a test to run a local server
//in your browser, go to localhost:8888
//you can also see "start" if you type localhost:8888/start


var http = require('http');
var url = require("url");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request received for " + pathname);
		
		route(pathname);
		
	    response.writeHead(200, {'Content-Type': 'text/plain'});
	    response.write('Hello World\n');
	    response.end();
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}


exports.start = start;
