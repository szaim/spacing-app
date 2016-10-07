var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var Form = require('./input');


var Questions = React.createClass({

	componentDidMount: function() {
		console.log('before dispatch', this.props.question);
		this.props.dispatch(actions.fetchUser());
		console.log('after dispatch', this.props.question);
	},
	
	// compareAnswer: function(e) {
	// 	e.preventDefault();
	// 	var userAnswer = this.refs.userInput.value;
	// 	console.log(userAnswer);
	// },
	// submitForm: function(result, userId) {
	// 		this.props.dispatch(actions.guessAnswer(result));
	// 		// this.props.dispatch(actions.putData(result, userId));
	// 		this.props.dispatch(actions.fetchUser());

	// },
	render: function() {
		return (
			<div className="container">
				<div className="test">
					<div className="left">
						<h1>Learn French</h1>
					</div>
					<div className="right">
						<button className="btn btn-primary"><a href='/logout'>Logout</a></button>
					</div>
				</div>
					<div className="questions">
						<h2 className="left"> {this.props.question} </h2>
						<h2 className="right"><Form /></h2>
					</div>
			</div>
		)
	}
});

var mapStateToProps = function(state, props) {
	return {
		id: state.userId,
		question: state.question.question,
		score: state.score
	} 
}
// var mapDispatchToProps = function(dispatch) {
// 	return {
// 		guessAnswer: function(result) {
// 			dispatch(actions.guessAnswer(result));

// 		},
// 		putData: function(result, userId) {
// 			dispatch(actions.putData(result, userId));

// 		},
// 		fetchUser: function() {
// 			dispatch(actions.fetchUser());

// 		}

// 	}
// }
var Container = connect(mapStateToProps)(Questions);

module.exports = Container;










