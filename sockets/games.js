var Game = require('../models/game');
module.exports = io => {
	io.on('connection', client => {
		client.on('create game', data => client.join(data));
		client.on('join', data => {
			Game.findById(data.game, (err, g) => {
				if (g.players.indexOf(data.player) === -1) {
					g.players.push(data.player);
					g.save(err => {
						if (!err) {
							console.log('player is trying to join');
							io.emit('new player', data);
							client.join(data.game);
							if (g.players.length === g.nplayers) { //ENOUGH PLAYERS
								console.log('we have enough players');
								io.to(data.game).emit('start game', data.game);
							}
						}
					});
				}
			});
		});
	});
};
