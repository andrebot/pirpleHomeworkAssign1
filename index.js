const HTTP = require('http');
const URL = require('url');
const config = require('./config');

const helloPayload = JSON.stringify({ msg: 'Hello World!' });
const errorPayload = JSON.stringify({ msg: 'Page not found' });

/**
 * Receives a request url (e.g.: /Hello/) and parse it so we can understand
 * which endpoint was called
 * 
 * @param {string} url request URL to be parsed
 * @returns the path, in lowercase, used in the request
 */
function parseUrl(url) {
  return URL.parse(url).pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
}

/**
 * Routes the request to the required resource. If none is found triggers a 404 handler
 * 
 * @param {string} path 
 * @param {object} response 
 * @param {function} response.setHeader will be used to set the response's Content-Type
 * @param {function} response.writeHead will be used to set the response's status code
 * @param {function} response.end will be used to write the response's payload and end the request
 */
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
