import Block from '../../core/Block';

import { USER_DATA_MOCK } from '../../constants';
import { pick } from '../../utils/objects-utils';
import { FormUiValidator } from '../../utils/form-validator';

export default class ChangePasswordPage extends Block {
  formValidator = new FormUiValidator() as FormUiValidator;

  constructor() {
    super({
      ...pick(USER_DATA_MOCK, ['password', 'avatar']),
      fields: [
        { 
          placeholder: 'Старый пароль',
          type: 'password',
          name: 'password',
          error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
          validate: true,
          formName: 'oldPassword'
        },
        { 
          placeholder: 'Новый Пароль',
          type: 'password',
          name: 'password',
          error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
          validate: true,
          formName: 'newPassword'
        },
        { 
          placeholder: 'Повторите новый пароль',
          type: 'password',
          name: 'password',
          error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
          validate: true,
          formName: 'newPasswordRepeat'
        } 
      ],

      onCheck: ({ name, valid, value, formName }) => this.formValidator.onCheck({ name, valid, value, formName }),
    })
  }

  componentDidMount() {
    const form = this.element!.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', this.onSubmit);
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    if(this.formValidator.vaidateOnSubmit(this.refs)) {
      console.log('[change-password]', this.formValidator.getFormData());
    };
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
            ${
              this.props.fields.map(({placeholder, validate, name,  error, type, formName }, index) => {
                return (
                  `{{{Input id="${index}" placeholder="${placeholder}" ref="${formName}" type="${'text'}" error="${error}" validate="${validate}" name="${name}" formName="${formName}" variant="main" onCheck=onCheck }}}`
                )
              })
              .join(' ')
            }

        <div class="user-page__footer">
          {{{ Button content="Сохранить" ref="button" variant="main" }}}
        </div>
      </form>
    </main>
    `)
  }
}