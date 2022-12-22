import Block from '../../core/Block';
import { DomUtils } from '../../utils/dom';
import { fields } from './utils/form-config';

type RegistrationPageState = {
  fields: FieldControl[];
  onCheck: (args: { name: string, valid: boolean, value: string }) => void;
}

export default class RegistrationPage extends Block<RegistrationPageState>{
  controlsValid: Record<string, {
    valid: boolean;
    value: string;
  }>;

  constructor() {
    super({
      fields,
      onCheck: ({ name, valid, value }) => this.onCheck({ name, valid, value }),
    })

    this.controlsValid = {};
  }

  componentDidMount(): void {
    const form = this.element!.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', this.onSubmit);
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    console.log('[autorize]', this.getFormData());
  }

  getFormData() {
    return Object.keys(this.controlsValid)
      .reduce((payload, key) => ({...payload, [key]: this.controlsValid[key].value }), {
        login: '',
        password: '',
      })
  }

  updateDisabledStateButton() {
    const isValid = Object.values(this.controlsValid).every(({ valid }) => valid);

    if(isValid) {
      DomUtils.removeAttribute(this.refs.button.getContent(), 'disabled');
    } else {
      DomUtils.setAttribute(this.refs.button.getContent(), 'disabled', 'true');
    }
  }

  onCheck =({ name, valid, value }: { name: string; valid: boolean, value: string }): void => {
    this.controlsValid[name] = { value, valid };

    this.updateDisabledStateButton();
  }

  render() {
    return (
      `<main class="content-center app__page">
        <form class="form">
          <div class="form__wrap">
            <legend class="form__title-legend">Регистрация</legend>
            ${
              this.props.fields.map(({placeholder, name, validate, type, error}, i) => {
                return (`
                  <fieldset class="form__fieldset">
                    {{{Input id="${i}" placeholder="${placeholder}" ref="${name}" type="${type}" error="${error}" validate="${validate}" name="${name}" variant="main" onCheck=onCheck }}}
                  </fieldset>`
                )
              })
              .join(' ')
            }

            <div class="form__buttons">
              {{{Button ref="button" disabled="false" content="Зарегистрироваться" variant="main"}}}
              {{{Link content="Войти" href="/" variant="block"}}}
            </div>
          </div>
        </form>
      </main>`
    )
  }
}