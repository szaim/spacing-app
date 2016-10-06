var mongoose = require('mongoose');
// var Login = require('./login');
var Question = require('./question');
var questionList = [
      { id: 0, question: "apple", answer: "pomme", correct: false},
      { id: 1, question: "book", answer:  "livre", correct: false},
      { id: 2, question: "fish", answer: "poisson", correct: false},
      { id: 3, question: "window", answer: "fenetre", correct: false},
      { id: 4, question: "hand", answer: "main", correct: false},
      { id: 5, question: "tree", answer: "arbre", correct: false},
      { id: 6, question: "flour", answer: "fleur", correct: false},
      { id: 7, question: "cat", answer: "chat", correct: false},
      { id: 8, question: "dog", answer: "chien", correct: false},
      { id: 9, question: "strawberry", answer: "fraise", correct: false},
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