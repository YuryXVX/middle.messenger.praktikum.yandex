import { AuthApi } from '../api/auth-api';
import Router from '../core/Router';
import { Store } from '../core/Store';
import { AuthDTO } from '../models/auth';
import { omit, toObjectWithCamelCase } from '../utils/objects-utils';
import { authHasError } from '../utils/type-guards/authHasError';

export class AuthService {
  authApi = new AuthApi();

  store: Store<AppState>;

  router: Router;

  constructor(store: Store<AppState>, router: Router) {
    this.store = store;
    this.router = router;
  }

  auth = async (auth: AuthDTO) => {
    try {
      this.store.dispatch({ auth });

      const result = await this.authApi.signIn(auth);

      if (authHasError(result)) {
        this.store.dispatch({ reason: result.reason  });
        return;
      }

      const user = await this.authApi.user();

      this.store.dispatch({ 
        user: toObjectWithCamelCase<UserDTO, UserEntity>(user), 
      });

      this.router.go('/');

    } catch (error: any) {
      const jsonError = JSON.parse(error.response) as Record<string, string>;

      if (authHasError(jsonError)) {
        this.store.dispatch({ reason: jsonError.reason });
      }
    } finally {
      // this.store.dispatch({ isError: false });
    }
  };

  signUp = async (userSignUpDTO: UserSignUpDTO) => {
    this.store.dispatch({ registration: userSignUpDTO });

    try {
      const result = await this.authApi.signUp(
        // @ts-ignore
        omit(userSignUpDTO, 'repeatPassword'),
      );

      if (authHasError(result)) {
        return;
      }

      await this.me();

      this.router.go('/');

    } catch (error: any) {
      const jsonError = JSON.parse(error.response) as Record<string, string>;

      if (authHasError(jsonError)) {
        this.store.dispatch({ reason: jsonError.reason });
      }
    }
  
  };

  me = async () => {
    this.store.dispatch({ isLoading: true });
    try {
      const user = await this.authApi.user();

      this.store.dispatch({ user: toObjectWithCamelCase<UserDTO, UserEntity>(user) }); 
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
    this.store.dispatch({ user: null });
  };
}
