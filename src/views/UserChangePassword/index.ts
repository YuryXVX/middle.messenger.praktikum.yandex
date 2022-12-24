import Block from '../../core/Block';

import { USER_DATA_MOCK } from '../../constants';
import { pick } from '../../utils/objects-utils';
import { FormUiValidator } from '../../utils/form-validator';
import { fields } from './utils/form-config';

type ChangePasswordPageProps = {
  fields: FieldControl[];
  onCheck: FormUiValidator['onCheck'];
};

export default class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  protected componentName = 'ChangePasswordPage';

  formValidator = new FormUiValidator() as FormUiValidator;

  constructor() {
    super({
      ...pick(USER_DATA_MOCK, ['password', 'avatar']),
      fields,

      onCheck: ({ name, valid, value, formName }) => (
        this.formValidator.onCheck({ 
          name, valid, value, formName, 
        })
      ),
    } as ChangePasswordPageProps);
  }

  componentDidMount() {
    const form = this.element!.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', this.onSubmit);
  }

  onSubmit = (evt: SubmitEvent) => {
    evt.preventDefault();

    if (this.formValidator.vaidateOnSubmit(this.refs)) {
      console.log('[change-password]', this.formValidator.getFormData());
    }
  };

  renderControls() {
    return this.props.fields.map(
      ({ placeholder, validate, name,  error, type, formName }, index) => {
        return (
          `{{{
            Input 
            id="${index}" 
            placeholder="${placeholder}" 
            ref="${formName}" 
            type="${type}" 
            error="${error}" 
            validate="${validate}" 
            name="${name}" 
            formName="${formName}" 
            variant="main" 
            onCheck=onCheck 
          }}}`
        );
      })
      .join(' ');
  }

  render() {
    return (`
    <main class="content-center">
      {{{ BackToView href="/user" }}}

      <div class="user-page">
        <div class="user-page__avatar">
          {{{Avatar src=avatar}}}
          <h3>{{screenName}}</h3>      
        </div>

        <form>
          <legend class="form__title-legend visually-hidden">Смена пароля</legend>
            ${ this.renderControls() }

        <div class="user-page__footer">
          {{{ Button content="Сохранить" ref="button" variant="main" }}}
        </div>
      </form>
    </main>
    `);
  }
}