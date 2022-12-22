import './styles.scss';
import Block from '../../core/Block';
import { DomUtils } from '../../utils/dom';
import { fields } from './utils/form-config';


type AuthPageState = {
  fields: FieldControl[];
  onCheck: (args: { name: string, value: string; valid: boolean }) => void;
}

export default class AuthPage extends Block<AuthPageState> {
  controlsValid: Record<string, {
    valid: boolean;
    value: string;
  }>;

  constructor() {
    super({
      fields,
      onCheck: ({ name, valid, value }) => this.onCheck({ name, valid, value }),
    })

    this.controlsValid = {}
  }

  componentDidMount(): void {
    const form = this.element!.querySelector('form') as HTMLFormElement;

    form.addEventListener('submit', this.onSubmit)
  }

  onCheck =({ name, valid, value }: { name: string; valid: boolean, value: string }) => {
    this.controlsValid[name] = { value, valid };

    this.updateDisabledStateButton();
  }

  updateDisabledStateButton() {
    const isValid = Object.values(this.controlsValid).every(({ valid }) => valid);

    if(isValid) {
      DomUtils.removeAttribute(this.refs.button.getContent(), 'disabled');
    } else {
      DomUtils.setAttribute(this.refs.button.getContent(), 'disabled', 'true');
    }
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    console.log('[auth]', this.getFormData());
  }

  getFormData() {
    return Object.keys(this.controlsValid)
      .reduce((payload, key) => ({...payload, [key]: this.controlsValid[key].value }), {
        login: '',
        password: '',
      })
  }

  render() {
    return (
      `<main class="auth content-center app__page">
        <form class="form auth__form">
          <div class="form__wrap auth__from-wrap">
            <legend class="auth__form-title form__title-legend">Вход</legend>

            ${
              this.props.fields.map(({placeholder, name, validate, error, type}, index) => {
                return (`
                  <fieldset class="form__fieldset">
                    {{{Input id="${index}" placeholder="${placeholder}" ref="${name}" type="${type}" error="${error}" validate="${validate}" name="${name}" variant="main" onCheck=onCheck }}}
                  </fieldset>`
                )
              })
              .join(' ')
            }
 
          </div>
      
          <div class="form__buttons">
            {{{Button ref="button" content="Авторизоваться" type="button" variant="main" }}}
            {{{Link content="Нет аккаута?" href="/registration" variant="block"}}}
          </div>
        </form>
      </main>`    
    )
  }
}

