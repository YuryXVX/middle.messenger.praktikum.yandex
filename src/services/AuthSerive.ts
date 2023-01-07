import { AuthApi } from '../api/auth-api';
// import { AuthDTO } from '../models/auth';
import { User } from '../models/user';



class AuthService {
  api: AuthApi;

  constructor(api: AuthApi) {
    this.api = api;
  }

  auth(dispatch: any, state: any, action: any) {
    console.log(action, dispatch);

    dispatch(action);
  }

  registration(payload: Pick<User, 'login' | 'password'>) {
    console.log('[sign-up]', payload);
  }
}

export const authService = new AuthService(new AuthApi());
