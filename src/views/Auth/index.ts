import './styles.scss';
import Block from '../../core/Block';
import { fields } from './utils/form-config';
import { FormUiValidator } from '../../utils/form-validator';
import { authService } from '../../services/AuthSerive';
import { User } from '../../models/user';


type AuthPageState = {
  fields: any[];
  onCheck: FormUiValidator['onCheck'];
}

export default class AuthPage extends Block<AuthPageState> {
  formValudator = new FormUiValidator() as FormUiValidator;
  constructor() {
    super({
      fields,
      onCheck: ({ formName, valid, value, name }) => this.formValudator.onCheck({ name, formName, valid, value }),
    })
  }

  componentDidMount(): void {
    const form = this.element!.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', this.onSubmit)
  }


  onSubmit = (evt) => {
    evt.preventDefault();

    if(this.formValudator.vaidateOnSubmit(this.refs)) {
      authService.signUp(this.formValudator.getFormData() as Pick<User, 'login' | 'password'>);
    }
  }


  render() {
    return (
      `<main class="auth content-center app__page">
        <form class="form auth__form">
          <div class="form__wrap auth__from-wrap">
            <legend class="auth__form-title form__title-legend">Вход</legend>
            ${
              this.props.fields.map(
                (
                  {placeholder, name, formName, validate, error, type}, index) => (
                  `{{{Input id="${index}" placeholder="${placeholder}" ref="${formName}" formName="${formName}" type="${type}" error="${error}" validate="${validate}" name="${name}" variant="main" onCheck=onCheck }}}`
                )
              )
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

