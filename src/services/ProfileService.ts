import UserApi from '../api/user-api';
import Router from '../core/Router';
import { Store } from '../core/Store';
import { User } from '../models/user';

export default class ProfileSerive {
  store: Store<AppState>;

  api = new UserApi();

  router: Router;


  constructor(store: Store<AppState>, router: Router) {
    this.store = store;
    this.router = router;
  }

  changeUserProfie = (user: User) => {
    this.store.dispatch({ reason: 'asdaSSSSS' });

    
    console.log('[change-user-profile]', user);
  };

  changeUserPassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) {
    console.log('[change-user-password]', { oldPassword, newPassword });
  }

  getUser(id: number) {
    console.log('[get-user-by-id]', id);
  }
}


