import { Route } from '../core/Router';
import { Views } from '../views';

export const routes: Route[] = [
  { 
    name: 'SignIn', 
    meta: { isAuth: false, title: 'Авторизация' }, 
    path: '/sign-in',
    component: Views['/auth'], 
  },
  { name: 'SignUp', 
    meta: { isAuth: false, title: 'Регистрация' }, 
    path: '/sign-up', 
    component: Views['/registration'],
  },
  { 
    name: 'Chat', 
    meta: { isAuth: true, title: 'Чат' }, 
    path: '/', 
    component: Views['/'], 
  },
  { 
    name: 'User', 
    meta: { isAuth: true, title: 'Профиль' }, 
    path: '/user', 
    component: Views['/user'], 
  },
  { 
    name: 'ChangePassword', 
    meta: { isAuth: true, title: 'Сменить пароль' }, 
    path: '/user-change-password', 
    component: Views['/user-change-password'], 
  },
  { 
    name: 'ChangePassword', 
    meta: { isAuth: true, title: 'Изменить пользователя' }, 
    path: '/user-settings', 
    component: Views['/user-settings'], 
  },
];