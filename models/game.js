var	mongoose = require('mongoose')
	, Schema = mongoose.Schema;
var schema = new mongoose.Schema({
	blind: Number,
	nplayers: Number,
	players: [{type: Schema.Types.ObjectId, ref: 'User'}],
	owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Game = module.exports = mongoose.model('Game', schema);

