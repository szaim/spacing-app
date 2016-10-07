var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
	
var Form = React.createClass({


	onFormSubmit: function(event){
		event.preventDefault();

		//Grabs the value from the input on submit
		var newTask = this.refs.theInput.value;
		console.log('NewTask ', newTask);
		
	
		if(newTask == this.props.question.answer) {
				this.props.question.correct = true;
				// this.props.score = 11; 
				// console.log("this is the answer", action.answer);
			}
			else {
				this.props.question.correct = false;
				// this.props.score = 0;
			}
			console.log('is the answer correct?', this.props.question)
		this.props.dispatch(actions.guessAnswer(newTask, this.props.question));
		this.props.dispatch(actions.putData(this.props.question, this.props.score, this.props.id));
		this.props.dispatch(actions.fetchUser());
		//Clears the value on Submit
		this.refs.theInput.value = '';

	},
	render: function(){
	return (
		<div className="form-wrapper">
		<form onSubmit={this.onFormSubmit} className='input-group'>
			<input placeholder='Enter French Translation' 
			className="form-control" ref="theInput" />
			<span className="input-group-btn">
				<button type='submit' className="btn btn-secondary">Submit</button>
			</span>
			</form>
			<p className="right">Score: {this.props.score}</p>
		</div>
	);
}});

var mapStateToProps = function(state, props) {
	return {
		id: state.googleID,
		question: state.question,
		score: state.score
	} 
}

var Container = connect(mapStateToProps)(Form);

module.exports = Container;