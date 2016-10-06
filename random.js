var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
 // {id: 899,
	// question: null,
	// answer: null,
	// correct: false},
	// {
	// 	score: 
	// }
	main : [{
		id: 899,
		question: null,
		answer: null,
		correct: false
		},
		{
			score: 0
		}

	]

};
var counter = 0;
var reducer = function(state , action) {
	state = state || initialState;
	
console.log('reducer worked!');

	if (action.type === actions.FETCH_USER_SUCCESS) {
		console.log('success worked!');
	
		//return {taskList: action.todo.taskList}

		// var newState = update(state, {
		// 	name: {$set: action.user[0]}
		// });
	
		
		console.log('new state', action.user[0].questions);
		var newState = update(state, {
			main: {$set: action.user}
		})
		state = Object.assign({}, state, main: [{
							id: action.user[0].questions[counter].id,
							question: action.user[0].questions[counter].question,
							answer: action.user[0].questions[counter].answer,
							correct: action.user[0].questions[counter].correct
		},
			{
				score: action.user[0].score
			}
		]);

		return state;
	}else if(action.type === actions.GUESS_ANSWER){
			var correct = state.main[0].correct;
			var score = state.main[1].score;
			if(action.answer == state.main[0].answer) {
				correct = true;
				var score += 1
				console.log("this is the answer", action.answer);
			}
			else {
				correct = false;
			}
			console.log("counter", counter);
			counter++;
			state = Object.assign({}, state, main: [{
				correct: correct
			},
			{score: score}
			]);
			console.log("counter", counter);
	}

	else if (action.type === action.FETCH_TODO_ERROR) {
		console.log(action.error, 'error');
		return state;
	}
	console.log('STATE!!!!!!!', state);
	return state;
};

exports.reducer = reducer;