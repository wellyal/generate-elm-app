'use strict';

import 'ace-css/css/ace.css';
import 'font-awesome/css/font-awesome.css';
import './../public/index.html';

const Elm = require('./Main.elm');
const mountNode = document.getElementById('main');

const app = Elm.Elm.Main.init({
	node: mountNode,
	flags: {},
});
