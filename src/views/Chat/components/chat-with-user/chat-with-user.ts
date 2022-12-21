import { CHAT_WITH_MOCK_USER } from "../../../../constants";
import Block from "../../../../core/Block";
import { Message } from "../../../../models/message";
import { User } from "../../../../models/user";
import { ChatMessageBlock } from "./chat-message-block";

import './styles.scss';

function wait(timer: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timer)
  })
}

type ChatWithUserViewProps = {
  user: User;
  messages: Message[];
}

export class ChatWithUserView extends Block<ChatWithUserViewProps>{
  constructor(props) {
    super({
      ...props,
      messages: [],
      loaded: true,
      onSubmitMessage: (message: string) => this.onSubmitMessage(message),
    })

    this.registerComponent(ChatMessageBlock);
  }

  componentDidMount(): void {
    // псоле интеграции с беком нужно вынести в отдельный сервис
    wait(60)
      .then(() => {
        const messages = CHAT_WITH_MOCK_USER[this.props.user.id];

        this.setState({
          messages
        })
      
      })
      .finally(() => {
        this.setState({ loaded: false })
      })
  }

  onSubmitMessage(message: string) {
    console.log('[submit]', {title: message});
  }

  _renderChat() {
    return this.props.messages.map(
      message => (
        `{{{  ChatItem message='${JSON.stringify(message)}' }}}`
      )
    )
    .join(' '); 
  }


  render() {
    const { user, loaded } = this.state;

    return (`
      <div class="chat-messages__block"> 
        <div>
          <header class="chat-messages__header">
            {{{ Avatar size="34" src=user.avatar }}}
            <span class="chat-messages__there-user">{{user.display_name}}</span>
          </header>

          <div class="chat-messages__messages">
            ${
              !loaded 
                ? this._renderChat() 
                : '<div class="chat-messages__spinner">{{{ Spinner }}}</div>'
              }
          </div>
        </div>

       {{{ ChatMessageBlock onSubmitMessage=onSubmitMessage }}}
      </div>
    `)
  }
}