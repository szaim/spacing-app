var React = require("react");


var Login = function() {
	// submit: function(e) {
	// 	console.log('login button worked');
	// 	e.preventDefault();
	// 	this.props.dispatch(actions.fetchUser());
	// },
		return (
			<div>
				<form>
					<button type='submit'><a href="/auth/google" >Login</a></button>
				</form>
			</div>
		)
};


module.exports = Login;