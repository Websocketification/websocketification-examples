/**
 * Created by fisher at 1:11 AM on 4/9/17.
 */

'use strict';

const http = require('http');
const WebSocket = require('ws');
const wst = require('websocketification');

// Server wrapper.
const mServer = http.createServer();
// Websocket server.
const mWebSocketServer = new WebSocket.Server({server: mServer});

// The app instance.
const app = wst(mWebSocketServer);
const port = 3123;

app.onConnected((req, res, next) => {
	console.log('Hello client!');
	next();
});

app.onClosed((req, res, next) => {
	console.log('Remote Peer closed connection!');
	next();
});

// Middlewares or routers.
// app.use([path, ]...middlewares/...routers);
app.use('/users', (req, res) => {
	res.done([{
		id: 0,
		name: 'Tom'
	}]);
});

// Here we use the wrapper server to listen.
mServer.listen(port);
console.log(`App is listening on port: ${port}.`);
