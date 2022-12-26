import Router from './core/Router';
import registerComponent from './core/registerComponent';
import * as Components from './components';

import { SCREENS } from './views';

import './styles/index.scss';

Object.entries(Components).forEach(([name, Component]) => {
  // @ts-ignore
  registerComponent(name, Component);
});



const root = document.querySelector('#root') as HTMLElement;

Router.instance(SCREENS, root).listen();

