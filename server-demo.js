var http = require('http');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});

  res.end('Hello world!');
}).listen(80);
console.log('NodeJS Server running');
