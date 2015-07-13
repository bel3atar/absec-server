var	express = require('express')
	, app = express()
	,	server = require('http').Server(app)
	,	io = require('socket.io')(server)
	, User = require('./models/user')
	, Game = require('./models/game')
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

//app.use(require('morgan')('combined'));
app.use(bodyParser.json());

require('./routes/users')(app);
require('./routes/games')(app, io);
require('./sockets/games')(io);

server.listen(3000);

Game.remove({}, () => {});
