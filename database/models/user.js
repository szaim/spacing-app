var mongoose = require('mongoose');
var Login = require('./login');
var Question = require('./question');

var UserSchema = new mongoose.Schema({
  user: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: "User"
  },
  data: [
  	{
	  	type: mongoose.Schema.Types.ObjectId,
	  	ref: "Question"
  	},
  	{
  		score: {
  			type: Number,
  			default: 0
  		}
  	}
  ]
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
