import Router, { MiddleWare, Route } from '../core/Router';
import { Store } from '../core/Store';

type PayloadGuardMiddleware = { pathname: string; router: Router };

export const guardMiddleware = (store: Store<AppState>): MiddleWare => 
  (
    route: Route, { pathname, router }: PayloadGuardMiddleware,
  ): boolean | void  => {
    const hasUser = Boolean(store.getState().user);

    if (!route.meta.isAuth && !hasUser) { 
      if ((pathname === '/sign-in' || pathname === '/sign-up') && !hasUser) {
        return true;
      }

      return router.go('/sign-in');
    } 

    if (!route.meta.isAuth && hasUser) {
      return router.go('/');
    }

    if (route.meta.isAuth && !hasUser) {
      return router.go('/sign-in');
    }

    return hasUser && route.meta.isAuth as boolean;
  };