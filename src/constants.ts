// @ts-ignore
import avatar from './assets/images/default-avatar.png';
import { User } from './models/user';
import { Message } from './models/message';


export const USER_DATA_MOCK = {
  avatar,    
  firstName: 'Yury',
  lastName: 'XVX',
  login: 'yury-xvx',
  email: 'yandex.ru',
  screenName: 'YURY',
  phone: '79234123123',
  password: 'qwerty1234',
};


function createUserEntity(_: unknown, id: number): Omit<User, 'password'> {
  return {
    id,
    'first_name': 'petya',
    'second_name': 'petrov',
    'display_name': 'petya petrov',
    'login': 'my-login',
    'email': 'my@email.com',
    'phone': '89223332211',
    avatar,
    'role': 'admin',
  };
}


function createChatEntity(_: unknown, id: number): Message {
  return {
    id,
    avatar,
    title: `hello - ${id}`,
    unread_count: 10,
    last_message: {
      user: createUserEntity(_, id),
      time: '2020-01-02T14:22:22.000Z',
      content: `hello form user - ${id}`,
    },
  };
}

export const USERS_CHAT_MOCK = new Array(15)
  .fill(null)
  .map(createUserEntity);

export const CHAT_WITH_MOCK_USER = USERS_CHAT_MOCK.reduce<Record<User['id'], Message[]>>((acc, user) => {
  acc[user.id] = new Array(100).fill(null).map(createChatEntity);
  return acc;
}, {}) as Record<string, Message[]>;