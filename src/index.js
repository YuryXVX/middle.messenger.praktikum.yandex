import Router from './core/Router';
import { PAGES } from './pages';
import { registerComponent } from './utils/register-component';
import { ComponentsMap } from './components';

import './styles/index.scss';

registerComponent(ComponentsMap);

const root = document.querySelector('#root');

Router
  .instance(PAGES, root)
  .listen();

