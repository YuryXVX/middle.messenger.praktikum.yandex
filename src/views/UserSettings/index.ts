import Block from '../../core/Block';

import { USER_DATA_MOCK } from '../../constants';
import { omit } from '../../utils/objects-utils';
import { fields } from './utils/form-config';
import { FormUiValidator } from '../../utils/form-validator';

export default class UserSettingsPage extends Block {
  formValidator = new FormUiValidator() as FormUiValidator;

  constructor() {
    super({
      ...omit(USER_DATA_MOCK, ['password']),
      fields,
      onCheck: ({ valid, value, formName, name }) => this.formValidator.onCheck({ name, valid, value, formName }),
    })
  }

  componentDidMount(): void {
    const form = this.element!.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', this.onSubmit);
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    if(this.formValidator.vaidateOnSubmit(this.refs)) {
      console.log('[settings-user]', this.formValidator.getFormData());
    }
  }
 
  render() {
    return (      
      `<main class="content-center">
        {{{BackToView href="/user"}}}
        <div class="user-page">
          <div class="user-page__avatar">
            {{{Avatar src=avatar}}}
            <h1></h1>
          </div>
          
          <form>
            <ul class="user-page__list"> 
            ${
              this.props.fields.map(
                ({placeholder, formName, name, validate, type, error}, i) => (
                  `{{{Input id="${i}" placeholder="${placeholder}" formName="${formName}" ref="${formName}" type="${type}" error="${error}" validate="${validate}" name="${name}" variant="main" onCheck=onCheck }}}`
                )
              )
              .join(' ')
            }

            <div class="user-page__footer">
              {{{Button content="Сохранить" variant="main"}}}
            </div>
          </form>
  
        </div>
      </main>
    
      `
    )
  }
}
