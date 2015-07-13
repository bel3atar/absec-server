var Game = require('../models/game')
	, ngames = 0;
module.exports = (app, io) => {
	app.get('/api/games', (req, res, next) => {
		Game.find((err, games) => {
			if (err) return res.status(500).send(err);
			res.send({games: games});
		});
	});
	app.post('/api/games', (req, res, next) => {
		Game.find({owner: new require('mongoose').Types.ObjectId(req.body.game.owner)}, (err, games) => {
			games.forEach(g => {
				con
				Game.findByIdAndRemove(g._id, (x, y) => io.emit('delete game', {id: g._id}));
			});
			new Game(req.body.game).save((err, game) => {
				if (err) return res.status(500).send(err);
				res.send({game: game});
				io.emit('new game', game);
			});
		});
	});
	app.delete('/api/games/:id', (req, res, next) => {
		Game.findByIdAndRemove(req.params.id, (err, g) => res.sendStatus(200));
	});
};
