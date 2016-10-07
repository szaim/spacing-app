require('isomorphic-fetch');
var Cookies = require("js-cookie");

var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user, score, answer) {
    return {
        type: FETCH_USER_SUCCESS,
        user: user,
        score: score,
        answer: answer


    };
};

var FETCH_USER_ERROR= 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
    return {
        type: FETCH_USER_ERROR,
        error: error
    };
};

var GUESS_ANSWER = 'GUESS_ANSWER';
var guessAnswer =function(answer, user) {
  return {
    type: GUESS_ANSWER,
    answer: answer,
    user: user
  }
};

// var PUT_ANSWER = 'PUT_ANSWER';
// var putAnswer =function(user) {
//   return {
//     type: PUT_ANSWER,
//     user: user
//   }
// }

var fetchUser = function() {
   return function(dispatch) {
     var token = Cookies.get('accessToken');
     console.log(token);
   		var headers = new Headers({
   			Authorization: 'bearer ' + token
   		});
       var url = 'http://localhost:8080/user';
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(user) {
               console.log("USER", user);
           return dispatch(
               fetchUserSuccess(user)
           );
       })
       .catch(function(error) {

           return dispatch(
               fetchUserError(error)
           );
       });
   }
};


var putData = function(user, score, userId) {
    console.log('before put', user)
    return function(dispatch) {
          var token = Cookies.get('accessToken');
          console.log("putdata");
        // var headers = new Headers({
            
        //     Authorization: 'bearer ' + token
        // });
        var url = 'http://localhost:8080/user/'+userId;
    return fetch(url,
    {
        method: 'put',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
            user: user,
            score: score

        })

    }
        ).then(function(response) {
            if(response.status < 200 || response.status > 300) {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then(function(user) {
            console.log('Data', user)
            return dispatch(
                fetchUserSuccess(user, score)
                );

        })
        .catch(function(error) {
            return dispatch(
                fetchUserError(error)
                );

        });


    }

};

exports.fetchUser = fetchUser;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.fetchUserError = fetchUserError;
exports.fetchUserSuccess = fetchUserSuccess;
exports.GUESS_ANSWER = GUESS_ANSWER;
exports.guessAnswer = guessAnswer;
exports.putData = putData;
// exports.PUT_ANSWER = PUT_ANSWER;
// exports.putAnswer = putAnswer;
