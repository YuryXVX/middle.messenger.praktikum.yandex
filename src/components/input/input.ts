import './styles.scss';
import Block from '../../core/Block';
import { Validator } from '../../utils/form-validator';

type InputProps = {
  placeholder: string;
  id: string;
  errorMessage: string;
  events: {
    input: (evt: InputEvent) => void;
    focus: () => void;
    blur: () => void;
  },
  value: string;
};

export class Input extends Block {
  protected componentName = 'Input';

  constructor(props: InputProps) {
    super({
      ...props,
      placeholder: props.placeholder || '',
      events: {
        input: (evt: InputEvent) => {
          this.validate();

          if (this.props.onInput) {
            this.props.onInput(evt);
          }
        },
        
        focus: () => this.validate(),
        blur: () => this.validate(),
      },

      errorMessage: '',
    });
  }

  getInputValue(): string {
    return this.getInputElement().value;
  }

  getInputElement(): HTMLInputElement {
    return this.getContent().querySelector('input')!;
  }

  toggleStateInput(valid: boolean) {
    if (!valid) {
      this.getInputElement().style.borderColor = 'red';
    } else {
      this.getInputElement().style.borderColor = '';
    }
  }

  validate = () => {
    const { name, validate, noErrorMessage, error, formName } = this.props;
    const validator = Validator.rules(name);

    const valid = validator(this.getInputValue());

    if (validate && noErrorMessage) {
      this.toggleStateInput(valid);
    }

    const errorMessage = !valid && !noErrorMessage
      ? error 
      : '';

    
    if (validate) {
      this.refs.hint.setProps({
        errorMessage,
      });
    }

    
    if (this.props.onCheck) {
      this.props.onCheck({
        name, valid, value: this.getInputValue(), ...(formName && { formName }), 
      });
    }

  };


  render() {
    return (
      `<fieldset class="form__fieldset">
        <div class="chat__input-wrap chat__input-wrap--error">
          <label class="visually-hidden" for="{{id}}">{{placeholder}}</label>
            {{{ 
              InputControl 
              error="{{error}}" 
              ref="input"
              events=events name='{{name}}' 
              type="{{type}}" 
              id="{{id}}" 
              placeholder="{{placeholder}}" 
              variant="{{variant}}"
              value=value 
            }}}
          <div>
            {{#if validate}}
            {{{ InputHint ref="hint" errorMessage="${this.props.errorMessage}" }}}
            {{/if}}
          </div>
        </div>
      </fieldset>
      `
    );
  }
}
