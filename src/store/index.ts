import { Store } from '../core/Store';

const INITIAL_STATE = {
  user: null,
  auth: {
    login: '',
    password: '',
  },

  isError: false,
  reason: '',
} as AppState;

export const store = new Store<AppState>(INITIAL_STATE);