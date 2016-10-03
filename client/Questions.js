var React = require("react");
var ReactDOM = require("react-dom");


var Questions = function(props) {

	return (
		<div className="container">
			<div className="test">
			<div className="left">
				<h1>Learn French</h1>
			</div>
			<div className="right">
				<button className="btn btn-primary">Logout</button>
			</div>
			</div>
				<div className="questions">
					<h2 className="left"> Apple </h2>
					<h2 className="right">Pomme</h2>
				</div>
				<p className="right">Score: 9</p>

		</div>

	)
};

module.exports = Questions;










