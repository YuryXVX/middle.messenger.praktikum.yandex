import registerComponent from './core/registerComponent';
import * as Components from './components';

import { store } from './store';
import { useRouter } from './router';
import { AuthService } from './services/AuthSerive';

import './styles/index.scss';
import { useServices } from './services/init';

Object.entries(Components).forEach(([name, Component]) => {
  // @ts-ignore
  registerComponent(name, Component);
});


const root = document.querySelector('#root') as HTMLElement;

const initApp = async () => {
  const router = useRouter(root)(store);
  const service = useServices<AuthService>(store, router, AuthService)(AuthService.name);

  await service.me();
};

window.addEventListener('DOMContentLoaded', async () => { 
  initApp();

  store.on('changed', (_, nextState) => {
    console.log(
      '%cstore updated',
      'background: #222; color: #bada55',
      nextState,
    );
  });
});