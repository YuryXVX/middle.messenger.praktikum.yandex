import Block from '../../core/Block';

import { fields } from './utils/form-config';
import { FormUiValidator } from '../../utils/form-validator';
import { AuthDTO } from '../../models/auth';
import { withStore } from '../../utils/hocs/withStore';

import './styles.scss';
import { authService } from '../../services/AuthSerive';


type AuthPageState = {
  fields: FieldControl[];
  onCheck: FormUiValidator['onCheck'];
};

class AuthPage extends Block<AuthPageState> {
  protected componentName = 'AuthPage';

  $store: any;
 
  formValudator = new FormUiValidator() as FormUiValidator;

  constructor(props: any) {
    super({
      ...props,
      fields,
      onCheck: ({ formName, valid, value, name }) => (
        this.formValudator.onCheck({ 
          name, formName, valid, value, 
        })
      ),
    });

    const button = this.refs.button.getContent();

    button.addEventListener('click', () => {
      this.$store.dispatch({ ...this.formValudator.getFormData<AuthDTO>() });
    });
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
          value=""
          onCheck=onCheck 
        }}}`
      ),
    ).join(' ');
  }

  render() {
    return (
      `<main class="auth content-center app__page">
        <div class="form auth__form">
          <div class="form__wrap auth__from-wrap">
            <legend class="auth__form-title form__title-legend">Вход</legend>
            ${ this.renderControls() }
          </div>
      
          <div class="form__buttons">
            {{{Button ref="button" content="Авторизоваться" type="button" variant="main" }}}
            {{{Link content="Нет аккаута?" href="/sign-up" variant="block"}}}
          </div>
        </div>
      </main>`    
    );
  }
}


function mapUserToProps(state: any) {
  console.log(state);
  return state;
}


export default withStore(AuthPage, mapUserToProps);