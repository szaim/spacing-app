var mongoose = require('mongoose');

var LoginSchema = new mongoose.Schema({
  googleID: { type: String, index: true },
  accessToken: {
  	type: String,
  	required: true
  }
});


var Login = mongoose.model('Login', LoginSchema);
module.exports = Login;
