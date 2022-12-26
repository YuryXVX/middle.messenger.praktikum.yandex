import { User } from '../models/user';

class ProfileSerive {
  changeUserProfie(user: User) {
    console.log('[change-user-profile]', user);
  }

  changeUserPassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) {
    console.log('[change-user-password]', { oldPassword, newPassword });
  }

  getUser(id: number) {
    console.log('[get-user-by-id]', id);
  }
}

export const profileSerive = new ProfileSerive();
