import { Store } from '../core/Store';

const INITIAL_STATE = {
  user: null,
  auth: {
    login: '',
    password: '',
  },

  registration: {
    email: '',
    first_name: '',
    second_name: '',
    login: '',
    password: '',
    phone: '',
    repeatPassword: '',
  },

  reason: '',
} as AppState;

export const store = new Store<AppState>(INITIAL_STATE);