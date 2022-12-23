import './styles.scss';
import Block from '../../core/Block';
import { InputControl } from './input-control';
import { InputHint } from './input-hint';
import registerComponent from '../../core/registerComponent';
import { Validator } from '../../utils/form-validator';


registerComponent(InputControl);
registerComponent(InputHint);


export class Input extends Block {
  constructor(props) {
    super({
      ...props,
      placeholder: props.placeholder || '',
      events: {
        input: (evt: InputEvent) => {
          this.validate();
          this.props.onInput && this.props.onInput(evt);
        },
        
        focus: () => this.validate(),
        blur: () => this.validate(),
      },

      errorMessage: '',
    })
  }

  getInputValue(): string {
    return this.getInputElement().value;
  }

  getInputElement(): HTMLInputElement {
    return this.getContent().querySelector('input')!;
  }

  toggleStateInput(valid: boolean) {
    if(!valid) {
      this.getInputElement().style.borderColor = 'red'
    } else {
      this.getInputElement().style.borderColor = ''
    }
  }

  validate = () => {
    const { name, validate, noErrorMessage, error, formName } = this.props;
    const validator = Validator.rules(name);

    const valid = validator(this.getInputValue());
    const value = this.getInputValue();


    if(validate && noErrorMessage) {
      this.toggleStateInput(valid);
    }

    const errorMessage = !valid && !noErrorMessage
      ? error 
      : '';


    validate && this.refs.hint.setProps({
      errorMessage
    })

    this.props.onCheck && this.props.onCheck({
       name, valid, value: this.getInputValue(), ...(formName && { formName }) 
    });
  }


  render() {
    return (
      `<fieldset class="form__fieldset">
        <div class="chat__input-wrap chat__input-wrap--error">
          <label class="visually-hidden" for="{{id}}">{{placeholder}}</label>
          {{{ InputControl error="{{error}}" ref="input" events=events name='{{name}}' type="{{type}}" id="{{id}}" placeholder="{{placeholder}}" variant="{{variant}}" value=value }}}
          <div>
            {{#if validate}}
            {{{ InputHint ref="hint" errorMessage="${this.props.errorMessage}" }}}
            {{/if}}
          </div>
        </div>
      </fieldset>
      `
    )
  }
}
