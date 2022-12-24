import Block from '../../core/Block';
import { User } from '../../models/user';
import { authService } from '../../services/AuthSerive';
import { FormUiValidator } from '../../utils/form-validator';
import { fields } from './utils/form-config';

type RegistrationPageState = {
  fields: FieldControl[];
  onCheck: (args: { formName: string, name: string; valid: boolean, value: string }) => void;
};

export default class RegistrationPage extends Block<RegistrationPageState> {
  protected componentName = 'RegistrationPage';
 
  formValidator = new FormUiValidator();

  constructor() {
    super({
      fields,
      onCheck: ({ formName, valid, value, name }) => (
        this.formValidator.onCheck({ name, formName, valid, value })
      ),
    });
  }

  componentDidMount(): void {
    const form = this.element!.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', this.onSubmit);
  }

  onSubmit = (evt: SubmitEvent) => {
    evt.preventDefault();

    if (this.formValidator.vaidateOnSubmit(this.refs)) {
      authService.signUp(this.formValidator.getFormData() as User);
    }
  };

  renderControls() {
    return this.props.fields.map(
      ({ placeholder, formName, name, validate, type, error }, i) => 
        (`{{{
          Input id="${i}"
          placeholder="${placeholder}"
          formName="${formName}"
          ref="${formName}"
          type="${type}"
          error="${error}"
          validate="${validate}" 
          name="${name}" 
          variant="main" 
          onCheck=onCheck 
        }}}`
        ),
    ).join(' ');
  }

  render() {
    return (
      `<main class="content-center app__page">
        <form class="form">
          <div class="form__wrap">
            <legend class="form__title-legend">Регистрация</legend>
            ${ this.renderControls() }
            <div class="form__buttons">
              {{{Button ref="button" content="Зарегистрироваться" variant="main"}}}
              {{{Link content="Войти" href="/" variant="block"}}}
            </div>
          </div>
        </form>
      </main>`
    );
  }
}