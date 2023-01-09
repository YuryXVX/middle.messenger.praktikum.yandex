import { AuthApi } from '../api/auth-api';
import Router from '../core/Router';
import { Store } from '../core/Store';
// import { ErrorRequest } from '../models/auth';
import { AuthDTO } from '../models/auth';
// import { User } from '../models/user';

function toObjectWithCamelCase<T extends object>(obj: T) {
  return Object.keys(obj).reduce((accum, key) => {
    const keySymbols = key.split('_');

    if (keySymbols.length >= 2) {
      const camelkey = keySymbols.map((s, i) => {
        if (i !== 0) {
          return s[0].toUpperCase() + s.slice(1);
        }

        return s;
      }).join('');

      accum[camelkey] = obj[key];
    } else {
      accum[key] = obj[key];

    }

    return accum;
  }, {});
}


export class AuthService {
  authApi = new AuthApi();

  store: Store<AppState>;

  router: Router;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(store: Store<AppState>, router: Router) {
    this.store = store;
    this.router = router;
  }

  auth = async (authDTO: AuthDTO) => {
    try {
      this.store.dispatch({ auth: authDTO });

      await this.authApi.signIn(authDTO);
      const user = await this.authApi.user();


      this.store.dispatch({ user });

      this.router.go('/');

    } catch (reason: unknown) {
      const error = reason as Record<string, string>;

      this.store.dispatch({ reason: error.response });

    } finally {
      // this.store.dispatch({ isError: false });
    }
  };

  signUp = async (payload: any, router: Router) => {
    await this.authApi.signUp(payload);
    router.go('/');
  };

  me = async () => {
    this.store.dispatch({ isLoading: true });
    try {
      const user = await this.authApi.user();

      this.store.dispatch({ user: toObjectWithCamelCase(user) }); 
    } catch (error) {
      this.router.go('/sign-in');
    } finally {
      this.store.dispatch({ isLoading: false });
      this.router.listen();
    }
  };


  signOut = async () => {
    await this.authApi.signOut();
    this.router.go('/sign-in');
  };
}
