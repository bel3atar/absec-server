var	User = require('../models/user')
	, passport = require('passport')
	, jwt = require('jsonwebtoken')
	, User = require('../models/user');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = app => {
	app.use(passport.initialize());
	app.get('/api/users/:id', (req, res, next) => {
		User.find(req.params.id, 'username score', (err, u) => {
			if (err) return res.send(404);
			console.log('GOT USER YOU ARE LOOKING FOR', u);
			res.send({user: u});
		});
	});
	app.post('/api/users', (req, res, next) => {
		User.register(
				new User(req.body.user), 
				req.body.user.password, 
				(err, u) => {
					if (err) { 
						res.status(500);
						res.send(err);
					} else {
						res.send(u);
					}
				}
		);
	});
	app.post('/api/login',
		passport.authenticate('local'),
		(req, res, next) =>  {
			var user = req.user;
			res.json({
				token: jwt.sign({uid: user._id, username: user.username}, 'ssuper ssecret sstring')
			});
		}
	);
}
