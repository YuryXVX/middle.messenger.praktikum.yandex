import { AuthDTO, ErrorRequest } from '../models/auth';
import BaseApi from './base-api';

const PREFIX = 'auth';

export class AuthApi extends BaseApi {
  constructor() { super(PREFIX); }

  async signIn(payload: AuthDTO): Promise<AuthDTO | ErrorRequest> {
    return this.post<AuthDTO | ErrorRequest, {}>('signin', {
      withCredentials: true,
      data: JSON.stringify(payload),
    });
  }

  async signUp(payload: any) {
    return this.post<{}, {}>('signup', {
      withCredentials: true,
      data: JSON.stringify(payload),
    });
  }

  async user() {
    const result = await this.get('user');
    return JSON.parse(result.response);
  }

  async signOut() {
    return this.post('logout', {
      withCredentials: true,
    });
  }
}