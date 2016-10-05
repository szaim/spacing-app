var mongoose = require('mongoose');
// var Login = require('./login');
var Question = require('./question');
var questionList = [
      {
        id: 0,
        question: "apple",
        answer: "pomme",
        correct: false
      },
      {
        id: 1,
        question: "book",
        answer: "livre",
        correct: false
      }

];
var UserSchema = new mongoose.Schema({

  googleID: { type: String, index: true },
  accessToken: {
        type: String,
        required: true
    },

  	questions: {
      type: Array,
      default: questionList
    },
  	score: {
  			type: Number,
  			default: 0
  	},
    fullName: {
      type: String
    }
  	

});


var User = mongoose.model('User', UserSchema);
module.exports = User;


// questions [e,f, hasUsergotitrightever][e,f][][][][]