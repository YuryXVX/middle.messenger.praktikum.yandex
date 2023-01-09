import Router from '../core/Router';
import { Store } from '../core/Store';

export default class App {
  router: Router;
  
  store: Store<AppState>;
  
  constructor({ router, store }: { router: Router; store: Store<AppState> }) {
    this.router = router;
    this.store = store;

    this.prepare();
  }

  prepare() {
    this.router.listen();
  }
}
  