var Game = require('../models/game');
module.exports = (app, io) => {
	app.get('/api/games', (req, res, next) => {
		Game.find((err, games) => {
			if (err) return res.status(500).send(err);
			res.send({games: games});
		});
	});
	app.post('/api/games', (req, res, next) => {
		console.log("Creating a new GAME");
		console.log(req.body.game);
		new Game(req.body.game).save((err, game) => {
			if (err) return res.status(500).send(err);
			res.send(game);
			io.emit('new game', game);
		});
	});
};
