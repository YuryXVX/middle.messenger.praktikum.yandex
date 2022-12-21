import Router from './core/Router';
import registerComponent from './core/registerComponent';
import * as Components from './components';

import { SCREENS } from './views';

import './styles/index.scss';


Object.values(Components).forEach(Component => {
  // @ts-ignore
  registerComponent(Component);
})



const root = document.querySelector('#root') as HTMLElement;

Router
  .instance(SCREENS, root)
  .listen();

