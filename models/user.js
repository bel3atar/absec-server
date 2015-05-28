var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	score: {type: Number, default: 1000}
});
schema.plugin(require('passport-local-mongoose'), {
});
module.exports = mongoose.model('User', schema);

