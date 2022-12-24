import Block from '../../core/Block';
import { User } from '../../models/user';
import './styles.scss';

type MessageProps = {
  user: User | string;
  currentId?: number;
  onSelect?: (user: User) => void;
  events: {
    click: () => void;
  };
};

export class Message extends Block<MessageProps> {
  protected componentName = 'Message';

  constructor(props: MessageProps) {
    if (typeof props.user === 'string') {
      props.user = JSON.parse(props.user);
    }

    super({
      ...props,
      events: {
        click: () => props.onSelect ? props.onSelect(this.props.user as User) : () => {},
      },
    });
  }

  get active(): boolean {
    const userId = (this.props.user as User).id;

    return Number(this.props?.currentId) === userId;
  }
  
  render() {
    return (`
        <div class="user-chat__item ${this.active ? 'user-chat__item--active' : ''}" data-user="{{user.id}}">
          {{{ Avatar size="40" src=user.avatar }}}

          <div class="user-chat__wrap">
            <div class="user-chat__header">
              <span class="user-chat__user-name">{{user.display_name}}</span>
              <span class="user-chat__time">10:49</span>
            </div>
            
            <div class="user-chat__content">
              <p class="user-chat__text">
                Друзья, у меня для вас особенный выпуск новостей!...
              </p>

              <span class="user-chat__unread">6</span>
            </div>
          </div>
        </div>
    `);
  }
}

