import Block from '../../../../core/Block';
import registerComponent from '../../../../core/registerComponent';
import { Message } from '../../../../models/message';
import { User } from '../../../../models/user';
import { chatService } from '../../../../services/ChatService';
import { ChatMessageBlock } from './chat-message-block';

// @ts-ignore
registerComponent('ChatMessageBlock', ChatMessageBlock);

import './styles.scss';

type ChatWithUserViewProps = {
  user: User;
  messages?: Message[];
  loaded?: boolean;
  onSubmitMessage?: (message: string) => void;
};

export class ChatWithUserView extends Block<ChatWithUserViewProps> {
  protected componentName = 'ChatWithUserView';

  constructor(props: ChatWithUserViewProps) {
    super({
      ...props,
      messages: [],
      loaded: true,
      onSubmitMessage: (message: string) => this.onSubmitMessage(message),
    });
  }

  componentDidMount(): void {
    chatService.getMessagesById(this.props.user.id)
      .then(messages => {
        this.setState({
          messages,
        });
      })
      .finally(() => {
        this.setState({ loaded: false });
      });
  }

  onSubmitMessage(message: string) {
    chatService.send({ message });
  }

  private renderChat() {
    return this.props.messages!.map(
      message => (
        `{{{  ChatItem message='${JSON.stringify(message)}' }}}`
      ),
    )
      .join(' '); 
  }


  private renderLoader() {
    return (
      `<div class="chat-messages__spinner">
        {{{ Spinner }}}
      </div>`
    );
  }

  renderChatBlock() {
    const { loaded } = this.state;

    return !loaded ? this.renderChat() : this.renderLoader();
  }

  render() {

    return (`
      <div class="chat-messages__block"> 
        <div>
          <header class="chat-messages__header">
            {{{ Avatar size="34" src=user.avatar }}}
            <span class="chat-messages__there-user">{{user.display_name}}</span>
          </header>

          <div class="chat-messages__messages">
            ${ this.renderChatBlock() }
          </div>
        </div>

       {{{ ChatMessageBlock onSubmitMessage=onSubmitMessage }}}
      </div>
    `);
  }
}
