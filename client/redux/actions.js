require('isomorphic-fetch');
var Cookies = require("js-cookie");

var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user) {
    return {
        type: FETCH_USER_SUCCESS,
        user: user,

    };
};

var FETCH_USER_ERROR= 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
    return {
        type: FETCH_USER_ERROR,
        error: error
    };
};

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

exports.fetchUser = fetchUser;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.fetchUserError = fetchUserError;
exports.fetchUserSuccess = fetchUserSuccess;
