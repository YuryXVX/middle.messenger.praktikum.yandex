import Block from '../../core/Block';
import { USERS_CHAT_MOCK } from '../../constants';
import { User } from '../../models/user';
import { DomUtils } from '../../utils/dom';
import { Observer } from '../../utils/pub-sub';
import { ChatWithUserView } from './components';

import './styles.scss';

type ChatPageProps = {
  data: User[];
  onSelect: (user: User) => void;
}

export default class ChatPage extends Block<ChatPageProps> {
  cleanup: (() => void) | null;
  currentUserId: null | User['id'];

  observer: ReturnType<typeof Observer>;

  constructor() {
    super({
      data: USERS_CHAT_MOCK,
      onSelect: (user: User) => this.onSelect(user),
    })

    this.cleanup = null;
    this.currentUserId = null;

    this.observer = Observer();

    const { sub } = this.observer;
   
    sub(this._getChatListWithSelectedUser.bind(this))
  }

  onSelect = (user: User) => {
    if(this.currentUserId === user.id) {
      return;
    }

    this.cleanup = DomUtils.toggleClasses(this.refs[user.id].getContent(), 'user-chat__item--active');
    this.currentUserId = user.id;

    this.observer.pub(() => this._renderChatWithUserComponent(user));
  }

  _renderChatWithUserComponent(user: User) {
    const chat = new ChatWithUserView({ user });
    DomUtils.replceChildNodes(this.element.querySelector('#chat'), chat.getContent());
  }

  componentWillUnmount(): void {
    this.cleanup = null;
    this.observer.cleanup();
  }

  _getUserMessagesList() {
    return this.props.data.map(
      user => (
        `{{{  Message user='${JSON.stringify(user)}' ref="${user.id}" onSelect=onSelect }}}`
      )
    )
    .join('');
  }
  
  _getChatListWithSelectedUser(templator?: () => string) {
    if(!templator) {
      return (
        `<div class="messages--empty">
          Выберите чат чтобы отправить сообщение
        </div>`
      );
    }

    if(templator && typeof templator === 'function') {
      return templator();
    }
  }

  render() {
    return (
      `<main class="chat app__page">
        <div class="chat__chat-list chat-list">
          <div class="chat-list__header">
            <div class="chat-list__header-wrap">
              <div class="chat-list__header-link">
              {{{ Link content="профиль" href="/user" class="chat__link" }}}
              </div>
              {{{ Input placeholder="Поиск" variant="secondary" }}}
            </div>
          </div>

          <div class="chat-list__users">
            ${ this._getUserMessagesList() }
          </div>
        </div>
      
        <div class="chat__messages-list messages" id="chat">
          ${ this._getChatListWithSelectedUser() }
        </div>
      </main>
      `
    );
  }
} 