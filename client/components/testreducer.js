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
	userId: null


};

var counter = 0;
var reducer = function(state  , action) {
	var question;
	console.log('reducer worked!');

	switch (action.type) {
		case actions.FETCH_USER_SUCCESS:
		console.log('success worked!');

		//return {taskList: action.todo.taskList}

		// var newState = update(state, {
		// 	name: {$set: action.user[0]}
		// });

		var user = action.user[0];
		return  Object.assign({}, state, {
			question: {
				id: user.questions[counter].id,
				question: user.questions[counter].question,
				answer: user.questions[counter].answer,
				correct: user.questions[counter].correct
			},
			score: user.score
		});


		case actions.GUESS_ANSWER:

			var correct = (action.answer == state.question.answer);
		
			counter++;
			question = Object.assign({}, state.question, {
				 
					correct: correct
				
			});

			return Object.assign({}, state, {
				question: question,
				score: state.score + (+correct)
			});

		case actions.PUT_ANSWER:
			return Object.assign({}, state, {
				userId: action.user[0].googleID
			})


		case action.FETCH_TODO_ERROR:

			console.log(action.error, 'error');

			return state;

		default: return initialState;
	}
	
};



exports.reducer = reducer;