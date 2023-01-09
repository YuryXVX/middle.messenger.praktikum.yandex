import Router from '../core/Router';
import { Store } from '../core/Store';
import { guardMiddleware } from '../middleware/guard-middleware';
import { routes } from './router-config';

export const useRouter = (root: HTMLElement) => (store: Store<AppState>) => Router.instance(
  routes, 
  root,
  guardMiddleware(store),
);