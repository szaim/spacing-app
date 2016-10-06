var React = require("react");
var Provider = require('react-redux').Provider;
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from './app';
import Questions from './questions';
import Login from './login';
import store from '../redux/store';



var routes = (
	<Provider store={store}>
	<Router history={hashHistory} >
		<Route path="/" component={Main} >
			<IndexRoute component={Login} />
			<Route path="/quiz" component={Questions} />
		</Route>
	</Router>
	</Provider>
);

module.exports = routes;
