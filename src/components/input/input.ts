import './styles.scss';
import Block from '../../core/Block';

const defaultProps = {
  events: {
    input: () => {}
  }
}

export class Input extends Block {
  constructor(props = defaultProps) {
    super({
      ...props,
      events: {
        input: (evt) => {
          if(this.props.onInput) {
            this.props.onInput(evt);
          }
        }
      }
    })
  }

  render() {
    return (
      `<div class="chat__input-wrap chat__input-wrap--error">
        <label class="visually-hidden" for="{{id}}">{{placeholder}}</label>
        <input 
          type="{{type}}" 
          id="{{id}}"
          name="{{name}}" 
          placeholder="{{placeholder}}"
          class="chat__input-control chat__input-control--{{variant}}"
          value="{{value}}"
        />

        <span class="chat__input-text-error">{{error}}</span>
      </div>
      `
    )
  }
}
