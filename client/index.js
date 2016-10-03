var React = require("react");
var ReactDOM = require("react-dom");
var Questions = require("./Questions");
require("../styles.css");
var Main = function(props) {

	return (
		<Questions />

	)
}







document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Main />, document.getElementById('app'));
});