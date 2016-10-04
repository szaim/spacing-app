var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Question = require('./database/models/question');

var db = 'mongodb://localhost:27017/testing';

mongoose.connect(db);

app.use('/', express.static('build'));

app.get('/app', function(req, res) {
	Question.find({})
					.exec(function(err, questions) {
						if (err) {
							res.send("Error has occured")
							}
						else {
							res.json(questions);
						}
					});
});




app.listen(8080, function () {
  console.log('Listening at 8080!');
});