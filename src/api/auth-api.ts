import { AuthDTO, ErrorRequest } from '../models/auth';
import { User } from '../models/user';
import BaseApi from './base-api';

const PREFIX = 'auth';

export class AuthApi extends BaseApi {
  constructor() { super(PREFIX); }

  async signIn(payload: AuthDTO): Promise<{} | ErrorRequest> {
    return this.post('signin', {
      withCredentials: true,
      data: JSON.stringify(payload),
    });
  }

  async signUp(payload: UserSignUpDTO) {
    const data = await this.post('signup', {
      withCredentials: true,
      data: JSON.stringify(payload),
    });
    
    return data as { id: number } | ErrorRequest;
  }

  async user(): Promise<User> {
    const result = await this.get('user');
    return JSON.parse(result.response);
  }

  async signOut() {
    return this.post('logout', {
      withCredentials: true,
    });
  }
}