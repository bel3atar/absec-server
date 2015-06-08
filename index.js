var	express = require('express')
	, app = express()
	,	server = require('http').Server(app)
	,	io = require('socket.io')(server)
	, User = require('./models/user')
	, mongoose = require('mongoose')
	, bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/absec');
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(require('morgan')('combined'));
app.use(bodyParser.json());
require('./routes/users')(app);
require('./routes/games')(app, io);
//WebSockets server setup 
/*
	, wss = new (require('ws').Server)({server: server})
	, clients = 0
	, id = 0;
wss.broadcast = data => wss.clients.forEach(c => c.send(JSON.stringify(data)));
wss.on('connection', ws => {
	ws.id = id++;
	wss.broadcast({ev: 'client count', data: ++clients});
	ws.on('message', msg => {
		console.log('received ' + msg);
		ws.send(JSON.stringify({date: new Date, data: msg}));
	});
	ws.on('close', () => wss.broadcast({ev: 'client count', data: --clients}));
});

*/
server.listen(3000);
