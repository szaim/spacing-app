var React = require("react");
import { render } from 'react-dom';
require("../styles.css");
var routes = require ('./components/router');
import Main from './components/app';


render(routes, document.getElementById('app'));