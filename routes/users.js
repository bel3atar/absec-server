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
			res.send({user: u});
		});
	});
	app.post('/api/users', (req, res, next) => {
		if (req.body.user.password)
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
		else { /* FACEBOOK LOGIN LOGIC */
			var u = User({
				username: req.body.user.username,
				fbid: req.body.user.fbid
			});
			u.save((err, user) => {
				if (err && err.code == 11000)
					return User.findOne(
						{fbid: req.body.user.fbid}, 
						'username fbid score',
						(err, user) => res.send({user: user}) 
					);
				else if (err && err.code != 11000) 
					return res.status(500).send(err);
				res.send({user: user});
			});
		}
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
