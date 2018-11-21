import './../public/index.html';
import { Elm } from './Main.elm';

const mountNode = document.getElementById('main');

const app = Elm.Main.init({
	node: mountNode,
	flags: {},
});
