var React = require("react");
var ReactDOM = require("react-dom");
var Questions = require("./questions");
var Login = require("./login");

var Main = function(props) {
	console.log("Hello world");
	return (
		
		<div>

			{props.children}
		</div>
	)
}

module.exports = Main;