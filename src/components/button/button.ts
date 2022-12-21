import './styles.scss';
import Block from '../../core/Block';

export class Button extends Block {
  constructor(props) {
    super({
      ...props,
      disabled: props.disabled,
      variant: props.variant || 'main',
      events: {
        click: props.onClick
      }
    })
  }

  render() {
    return (
      `<button 
        data-id="{{id}}"
        disabled="{{disabled}}" 
        class='chat__button chat__button--{{variant}}'
      >
        {{content}}
      </button>`
    )
  }
}

