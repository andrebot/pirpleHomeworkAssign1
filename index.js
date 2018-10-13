const HTTP = require('http');
const URL = require('url');
const config = require('./config');

const helloPayload = JSON.stringify({ msg: 'Hello World!' });
const errorPayload = JSON.stringify({ msg: 'Page not found' });

function parseUrl(url) {
  return URL.parse(url).pathname.replace(/^\/+|\/+$/g, '');
}

function routeRequest(path, response) {
  response.setHeader('Content-Type', 'application/json');

  if (path === 'hello') {
    response.writeHead(200);
    response.end(helloPayload);
  } else {
    response.writeHead(404);
    response.end(errorPayload);
  }
}

const httpServer = HTTP.createServer((request, response) => routeRequest(parseUrl(request.url), response));
httpServer.listen(config.PORT, function() {
  console.log(`Listening on port ${config.PORT}`);
});
