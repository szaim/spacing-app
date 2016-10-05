var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	french: String,
	english: String
});



var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;