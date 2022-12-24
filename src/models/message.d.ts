import { User } from './user';

export type Message = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: Omit<User, 'password'>,
    time: string,
    content: string;
  }
};
