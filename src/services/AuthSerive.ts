import { User } from '../models/user';

class AuthService {
  signIn(payload: User) {
    console.log('[sing-in]', payload);
  }
  signUp(payload: Pick<User, 'login' | 'password'>) {
    console.log('[sign-up]', payload);
  }
}

export const authService = new AuthService()