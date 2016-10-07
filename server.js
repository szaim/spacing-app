var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Question = require('./database/models/question');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
    var BearerStrategy = require('passport-http-bearer').Strategy;

var passport = require("passport");
var bodyParser = require("body-parser");

var User = require('./database/models/user');
var Login = require('./database/models/question');

var config = require('./config');

var db = 'mongodb://localhost:27017/testing';

mongoose.connect(db);
app.use(passport.initialize());
// app.use(passport.serializeUser());
app.use('/', express.static('build'));
app.use(bodyParser.json());

app.get('/app', function(req, res) {
    User.find({})
        .exec(function(err, users) {
            if (err) {
                res.send("Error has occured")
            } else {
                res.json(users);
            }
        });
});





passport.use(new GoogleStrategy({

        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL,

    },
    function(accessToken, refreshToken, profile, done) {
        console.log('PROFILE', profile);

        // var user = {
        //     googleID: profile.id,
        //     accessToken: accessToken
        // }
         // return done(null, user);
        User.find({
            'googleID': profile.id
        }, function(err, users) {
            console.log('users', users.length)
            if (!users.length) {

                User.create({
                    googleID: profile.id,
                    accessToken: accessToken,
                    // questions: questArr,
                    score: 0,
                    fullName: profile.displayName
                }, function(err, users) {
                    console.log('=======>>', err, users[0])
                    return done(err, users[0]);
                });

            } else {
                // update user with new tokens
                return done(err, users);
            }



        });


    }));


passport.use(new BearerStrategy(
  // function(token, done) {
  //     console.log(token);
  //     if (token == "ya29.CjB0A2ldOpp9zilFcam6tIkGkADUBON2blsU-ozKvrrmmuqLg-Qnz9iJoHyA2fQRW0Y") {
  //           var user = {user: 'bob'}
  //         return done(null, user, {scope: 'read'});
  //     }
  //     return done(null, false);
  // }
  function(token, done) {
  User.find({ accessToken: token },
    function(err, users) {
      if(err) {
          return done(err)
      }
      if(!users) {
          return done(null, false)
      }
      return done(null, users, { scope: ['read'] })
    }
  );
}
));


// app.get('/login',
//     passport.authenticate('google', {
//         scope: ['profile']
//     }),
//     function(req, res) {
//         // res.send(req.user);
//         console.log("it works");

//     });


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
        console.log('req', req);
        console.log('req.user', req.user);
        console.log('req.user.accessToken', req.user[0].accessToken);
        res.cookie("accessToken", req.user[0].accessToken, {expires: 0});
        // httpOnly: true
            // Successful authentication, redirect home.
        res.redirect('/#/quiz');
    }
);

app.get('/user', passport.authenticate('bearer', {session: false}), 
    function(req, res) {
        return res.send(req.user);
});

//TODO: finish implementing this function
app.put('/user/:googleID', passport.authenticate('bearer', {session: false}),
 function(req, res) {
  // console.log('req.body', req.body, req.body.user.id)
     //    User.findOneAndUpdate(
     //      { googleID: req.params.googleID, questions: {$elemMatch: {id:req.body.user.id}} },
     //      {
     //        $set: {correct: req.body.user.correct}
     //        // score: req.body.score

     //      },
     //    {
     //      'new': true
     //    },

     //     function(err, user) {
     //      if(err) {
     //        return res.send(err)
     //      }
     //      return res.send(user);
     // });

     User.update({"googleID": req.params.googleID, "questions.id" : req.body.user.id}, {"$set" : {"questions.$.correct" : req.body.user.correct, "score": req.body.score}},
      function(err, user) {
          if(err) {
            return res.send(err)
          }
          return res.send(user);

      });
     console.log("body", req.body);


     
    
      //udpate db and return true/false
      //return res.send({questions:'PUT QUESTIONS HERE'});
  });


app.listen(8080, function() {
    console.log('Listening at 8080!');
});