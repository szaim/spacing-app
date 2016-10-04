var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Question = require('./database/models/question');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require("passport");
var bodyParser = require("body-parser");

var User = require('./database/models/user');
// var Login = require('./database/models/login');

var config = require('./config');

var db = 'mongodb://localhost:27017/testing';

mongoose.connect(db);
app.use(passport.initialize());
// app.use(passport.serializeUser());
app.use('/', express.static('build'));
app.use(bodyParser.json());

app.get('/app', function(req, res) {
    Question.find({})
        .exec(function(err, questions) {
            if (err) {
                res.send("Error has occured")
            } else {
                res.json(questions);
            }
        });
});





passport.use(new GoogleStrategy({

        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {
        // console.log('yay!', token, refreshToken, profile)

        // User.findOrCreate({ googleID: profile.id }, function (err, user) {
        //   			return done(err, user);
        //   		});
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        // process.nextTick(function() {

        //     // try to find the user based on their google id
        console.log(profile.id)
        User.find({
            'googleID': profile.id
        }, function(err, users) {
            console.log('users', users.length)
            if (!users.length) {

                User.create({
                    googleID: profile.id,
                    accessToken: token,
                    score: 0
                }, function(err, users) {
                    console.log('asdfasfasf', err, users)
                    return done(err, users);
                });

            } else {
                return done(err, users);
            }



        });


    }));





app.get('/login',
    passport.authenticate('google', {
        scope: ['profile']
    }),
    function(req, res) {
        // res.send(req.user);
        console.log("it works");

    });


// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failure',
        session: false
    }),
    function(req, res) {
        console.log('success')
            // Successful authentication, redirect home.
        res.redirect('/');
    }
);




app.listen(8080, function() {
    console.log('Listening at 8080!');
});