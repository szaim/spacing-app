var React = require("react");
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from './app';
import Questions from './questions';
import Login from './login';



var routes = (
	<Router history={hashHistory} >
		<Route path="/" component={Main} >
			<IndexRoute component={Login} />
			<Route path="/quiz" component={Questions} />
		</Route>
	</Router>
);

module.exports = routes;
