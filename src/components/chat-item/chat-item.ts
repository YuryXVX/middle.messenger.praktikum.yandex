import Block from '../../core/Block';
import { Message } from '../../models/message';
import { DateLib } from '../../utils/date';

import './styles.scss';

type ChatItemProps = {
  message: Message; 
  own: boolean;
};

export class ChatItem extends Block<ChatItemProps> {
  protected componentName = 'ChatItem';

  constructor(props: ChatItemProps) {
    super({
      ...props,
      own: props.own || false,
      message: typeof props.message === 'string'
        ? JSON.parse(props.message)
        : props.message,
    });
  }

  render() {
    const classes = this.props.own ? 'own' : 'there';

    return (`
      <div class="chat__position chat__position--${classes}">
        <div class="chat__message chat__message--${classes}">
          {{message.last_message.content}}

          <div class="chat__message-footer">
            <span class="chat__message-time">
              ${DateLib.timeString(this.props.message.last_message.time)}
            </span>
          </div>
        </div>
      </div>
    `);
  }
}