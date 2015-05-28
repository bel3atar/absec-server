var	User = require('../models/user')
	, passport = require('passport')
	, jwt = require('jsonwebtoken');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = app => {
	app.use(passport.initialize());
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
		(req, res, next) =>  res.json({
			token: jwt.sign({name: req.username}, 'ssuper ssecret sstring')
		})
	);
}
