var mongoose = require('mongoose');

var LoginSchema = new mongoose.Schema({
  googleID: { type: String, index: true }
});


var Login = mongoose.model('Login', LoginSchema);
module.exports = Login;
