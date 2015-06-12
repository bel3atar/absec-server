var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	score: {type: Number, default: 1000},
	fbid: {type: String, index: {unique: true}}
});
schema.plugin(require('passport-local-mongoose'), {
});
module.exports = mongoose.model('User', schema);

