import Block from "../../../../core/Block";
import { DomUtils } from "../../../../utils/dom";


export class ChatMessageBlock extends Block {
  buttonNode: HTMLElement;
  message: string;

  protected componentName = 'ChatMessageBlock';
  constructor(props) {
    super({
      ...props,
      onSubmit: () => this.onSubmit(),
      onInput: (evt) => this.onInput(evt),
    })

    this.buttonNode = this.refs.messageButton.getContent();
    this.message = '';
  }

  onInput = (evt) => {
    const input = evt.target as HTMLInputElement;
  
    this.message = input.value.replace(/\s/g, '');

    if(this.message.length > 1) {
      DomUtils.removeAttribute(this.buttonNode, 'disabled');
    } else {
      DomUtils.setAttribute(this.buttonNode, 'disabled', 'true');
    }
  }

  onSubmit = () => {
    this.props.onSubmitMessage(this.message)
  }

  render() {
    return (`
    <div class="chat-messages__input">
      <div class="chat-messages__input-control">
        {{{ Input ref="messageInput" onInput=onInput placeholder="Сообщение" variant="secondary" }}}
      </div>
      <div class="chat-messages__input-button">
        {{{ Button ref="messageButton" disabled="true" content="" onClick=onSubmit }}}
      </div>
    </div>`
    )
  }
}