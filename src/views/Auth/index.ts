import Block from '../../core/Block';

import { fields } from './utils/form-config';
import { FormUiValidator } from '../../utils/form-validator';
// import { AuthDTO } from '../../models/auth';
import { withStore } from '../../utils/hocs/withStore';

import { Store } from '../../core/Store';

import './styles.scss';
import { useServices } from '../../services/init';
import Router from '../../core/Router';
import { AuthService } from '../../services/AuthSerive';


type AuthPageState = Pick<AppState, 'auth'> & {
  fields: FieldControl[];
  router: Router
  onCheck: FormUiValidator['onCheck'];
};

class AuthPage extends Block<AuthPageState> {
  static componentName = 'AuthPage';

  $store: Store<AppState>;

  $service: AuthService;

 
  formValudator = new FormUiValidator() as FormUiValidator;


  constructor(props: AuthPageState) {
    super({
      ...props,
      fields,
    });

    this.$service = useServices(this.$store, this.props.router, AuthService)(AuthService.name);
  }

  protected getStateFromProps(): void {


    this.state = {
      onLogin: () => {
        const form = document.querySelector('form');

        form?.addEventListener('submit', e => e.preventDefault());
        
        if (this.formValudator.vaidateOnSubmit(this.refs)) {
          this.$service.auth(this.formValudator.getFormData());
        }       
      },
    
      onCheck: ({ formName, valid, value, name }: any) => (
        this.formValudator.onCheck({ 
          name, formName, valid, value, 
        })
      ),
    };
  }

  renderControls() {
    return this.props.fields.map(
      ({ placeholder, name, formName, validate, error, type }, index) => (
        `{{{Input 
          id="${index}" 
          placeholder="${placeholder}" 
          ref="${formName}" 
          formName="${formName}" 
          type="${type}" 
          error="${error}" 
          validate="${validate}" 
          name="${name}" 
          variant="main" 
          value="${this.props[name]}"
          onCheck=onCheck 
        }}}`
      ),
    ).join(' ');
  }

  render() {
    return (
      `<main class="auth content-center app__page">
        <form class="form auth__form">
          <div class="form__wrap auth__from-wrap">
            <legend class="auth__form-title form__title-legend">Вход</legend>
            ${ this.renderControls() }
          </div>

          <div>{{ reason }}</div>
      
          <div class="form__buttons">
            {{{Button ref="button" onClick=onLogin content="Авторизоваться" type="button" variant="main" }}}
            {{{Link content="Нет аккаута?" href="/sign-up" variant="block"}}}
          </div>
        </form>
      </main>`    
    );
  }
}

const authSelector = (state: AppState) => {
  return {
    login: state.auth.login,
    password: state.auth.password,
    reason: state.reason,
  };
};

export default withStore(AuthPage, authSelector);