var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
	question:{
		id: 899,
		question: null,
		answer: null,
		correct: false
	},
	score: 0,
	googleID: null


};

var counter = 0;
var reducer = function(state  , action) {
	state = state || initialState;
	console.log('reducer worked!');

	switch (action.type) {
		case actions.FETCH_USER_SUCCESS:
		console.log('success worked!');

		//return {taskList: action.todo.taskList}

		// var newState = update(state, {
		// 	name: {$set: action.user[0]}
		// });


		var user = action.user[0];
		state = Object.assign({}, state, {
			question: {
				id: user.questions[counter].id,
				question: user.questions[counter].question,
				answer: user.questions[counter].answer,
				correct: user.questions[counter].correct
			},
			score: user.score,
			googleID: user.googleID
		});
		var currentQuestion = user.questions.shift();
		var tmp = currentQuestion;
		if(action.answer == state.question.answer) {
			counter += 2;
			console.log("hello");
			user.questions = user.questions.slice(0, counter).concat(currentQuestion).concat(user.questions.slice(counter));
			console.log("sadasdasd", user.questions)
			currentQuestion = user.questions.shift();
			// return true;
		} else {
			counter += 1;
			// console.log("hello else");
			currentQuestion = user.questions.shift();
			user.questions.unshift(tmp);
			// return false;
		}


		// counter += 4;
		return state;
		console.log("questions reducer", (action.answer == state.question.answer));

	// case actions.GUESS_ANSWER:

	// 		console.log("user question", user.questions.shift());
	// 	 var currentQuestion = user.questions.shift();
	// 	// // var M = 1;
	// 	var tmp = currentQuestion;
	// 	console.log("before reducer answer", (action.answer == state.question.answer));
	// 	if(action.answer == state.question.answer) {
	// 		counter += 4;
	// 		console.log("hello");
	// 		user.questions = user.questions.slice(0, counter).concat(currentQuestion).concat(user.questions.slice(counter));
	// 		currentQuestion = user.questions.shift();
	// 		// return true;
	// 	} else {
	// 		counter = 1;
	// 		console.log("hello else");
	// 		currentQuestion = user.questions.shift();
	// 		user.questions.unshift(tmp);
	// 		// return false;
	// 	}

	// 	return state;

			// 	console.log("answer action", action.answer);
			// 	console.log("answer state", state.question.answer); // "pomme "
			// 	console.log("answer is correct", (action.answer == state.question.answer));
			// 	var correct = state.question.correct;
				// var score = state.score;
			// if(action.answer == state.question.answer) {
			// 	correct = true;
				// score += 1;
			// 	console.log("this is the answer", action.answer);
			// }
			// else {
			// 	correct = false;
			// }
			// console.log("counter", counter);
			
			// state = Object.assign({}, state, {
			// 	question:{
			// 		correct: correct
			// 	},
			// 	score: score
			// });
			// console.log("state", state, correct);
			// return state;
			

		// case actions.PUT_ANSWER:
		// 	var user = action.user[0];
		// 	state = Object.assign({}, state, {
		// 		question: {
		// 			id: user.questions[counter].id,
		// 			question: user.questions[counter].question,
		// 			answer: user.questions[counter].answer,
		// 			correct: user.questions[counter].correct
		// 		},
		// 		score: user.score,
		// 		googleID: user.googleID
		// 	});
		// 	return state;


		case action.FETCH_USER_ERROR:

			console.log(action.error, 'error');

			return state;

	}

	return state;
	
};



exports.reducer = reducer;