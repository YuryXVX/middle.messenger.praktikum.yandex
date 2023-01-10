import Block from '../../core/Block';
import Router from '../../core/Router';

import { Store } from '../../core/Store';
import { AuthService } from '../../services/AuthSerive';
import { useServices } from '../../services/init';
import { FormUiValidator } from '../../utils/form-validator';
import { withStore } from '../../utils/hocs/withStore';
import { fields } from './utils/form-config';

type RegistrationPageState = {
  fields: FieldControl[];
  router: Router;
  reason: string;
  onCheck: (args: { formName: string, name: string; valid: boolean, value: string }) => void;
};

class RegistrationPage extends Block<RegistrationPageState> {
  protected componentName = 'RegistrationPage';
 
  formValidator = new FormUiValidator();

  $service: AuthService;

  $store: Store<AppState>;

  constructor(props: any) {
    super({
      ...props,
      fields,
      onCheck: ({ formName, valid, value, name }) => (
        this.formValidator.onCheck({ name, formName, valid, value })
      ),
    });

    this.$service = useServices(this.$store, this.props.router, AuthService)(AuthService.name);
  }

  protected getStateFromProps(props: any): void {
    this.state = {
      ...props,
  
      onSubmit: async () => {
        const form = this.element!.querySelector('form') as HTMLFormElement;
        form.addEventListener('submit', evt => evt.preventDefault());

        Object.keys(this.refs).forEach((ref) => {
          if (ref !== 'button') {
            const { value } = this.refs[ref].refs.input.getContent() as HTMLInputElement;
            this.state.registration[ref] = value;
          }
        });

        if (this.formValidator.vaidateOnSubmit(this.refs)) {
          await this.$service.signUp(this.state.registration);
        }
      },
    };
  }

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
          value="${this.state.registration[formName]}"
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
              {{{Button ref="button" onClick=onSubmit content="Зарегистрироваться" variant="main"}}}
              {{{Link content="Войти" href="/" variant="block"}}}
            </div>
          </div>
    
          <div style="color: red">${this.props.reason}</div>
        </form>
      </main>`
    );
  }
}


// @ts-ignore
export default withStore(RegistrationPage, ({ reason, registration }: AppState) => {
  return { reason, registration  };
});