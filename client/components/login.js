var React = require("react");
var ReactDOM = require("react-dom");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');

var Login = React.createClass({
	submit: function(e) {
		console.log('login button worked');
		e.preventDefault();
		this.props.dispatch(actions.fetchUser());
	},
	
	render: function() {
		console.log('user data', this.props.user);
		return (
			<div>
				<form onSubmit={this.submit}>
					<button type='submit'><a href="/auth/google" >Login</a></button>
				</form>

			</div>
			)
	}
});

var mapStateToProps = function(state, props) {
	return {
		user: state.name
	} 
}
var Container = connect(mapStateToProps)(Login);
module.exports = Container;