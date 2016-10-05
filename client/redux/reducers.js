var actions = require('../actions/actions');
var update = require('react-addons-update');

var initialState = {
	name: []

}

var reducer = function(state , action) {
	state = state || initialState;
	
console.log('reducer worked!');

	if (action.type === actions.FETCH_USER_SUCCESS) {
		console.log('success worked!');
		console.log(action.todo[0].title);
		//return {taskList: action.todo.taskList}

		var newState = update(state, {
			name: {$set: action.user}
		});
		
		console.log('new state', newState.taskList);
		return newState;
	}

	else if (action.type === action.FETCH_TODO_ERROR) {
		console.log(action.error, 'error');
		return state;
	}

	return state;
};

exports.reducer = reducer;