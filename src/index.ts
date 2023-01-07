import Router from './core/Router';
import registerComponent from './core/registerComponent';
import * as Components from './components';

import { SCREENS } from './views';

import './styles/index.scss';
import { store } from './store';

Object.entries(Components).forEach(([name, Component]) => {
  // @ts-ignore
  registerComponent(name, Component);
});


type Route<T> = {
  name: string;
  path: string,
  meta: Record<string, string | boolean>;
  component: T;
};

const routes: Route<any>[] = [
  { name: 'SignIn', meta: { isAuth: false }, path: '/sign-in', component: SCREENS['/auth'] },
  { name: 'SignUp', meta: { isAuth: false }, path: '/sign-up', component: SCREENS['/registration'] },
  { name: 'Chat', meta: { isAuth: true }, path: '/', component: SCREENS['/'] },
  { name: 'User', meta: { isAuth: true }, path: '/user', component: SCREENS['/user'] },
];

const guardMiddleware = (state: any) => (route: Route<any>, self: Router) => {
  // const isAuth = store.isAuth === route.meta.isAuth;

  // if (!isAuth && !store.user) {
  //   if (route.name === 'SignIn' || route.name === 'SignUp') {
  //     return true;
  //   } else {
  //     self.navigate('/sign-in');
  //     return;
  //   }
  // }


  // console.log(self.prevPage);

  // if (!route.meta.isAuth && store.isAuth) {
  //   return false;
  // }

  return true;
};


class App {
  store: any;

  router: any;

  constructor({ router }: { router: Router }) {
    this.store = store;
    this.router = router;

    this.prepare();
  }


  prepare() {
    this.router.listen();
  }
}


const root = document.querySelector('#root') as HTMLElement;


window.addEventListener('DOMContentLoaded', () => {  
  new App({
    router: Router.instance(routes, root, guardMiddleware(store), store),
  });


  store.on('changed', (prevState, nextState) => {
    console.log(nextState);
    if (process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
    }
  });
});