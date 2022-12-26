import { CHAT_WITH_MOCK_USER } from '../constants';
import { Message } from '../models/message';
import { User } from '../models/user';


function wait<T>(data: T, timer: number): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), timer);
  });
}

class ChatService {
  send(message: { message: string }) {
    console.log('[send-message-chat-service]', message);
  }

  _mockChatsById(id: User['id']): Message[] {
    return CHAT_WITH_MOCK_USER[id];
  }

  getMessagesById(id: number): Promise<Message[]> {
    return wait<Message[]>(this._mockChatsById(id), 60);
  }
}

export const chatService = new ChatService();
