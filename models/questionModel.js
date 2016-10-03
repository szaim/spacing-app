var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	french: String,
	english: String
});



module.exports = mongoose.model('Question', QuestionSchema);