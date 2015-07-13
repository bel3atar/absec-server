var Game = require('../models/game');
module.exports = io => {
	io.on('connection', socket => {
		socket.on('join', data => {
			Game.findByIdAndUpdate(
				data.game, {$addToSet: {players: data.player}},
				(err, u) => { if (!err && u) io.emit('new player', data); }
			);
		});
	});
};
