import Block from '../../core/Block';


import { fields } from './utils/form-config';
import { FormUiValidator } from '../../utils/form-validator';
import { withStore } from '../../utils/hocs/withStore';
import { USER_DATA_MOCK } from '../../constants';
import ProfileSerive from '../../services/ProfileService';
import { useServices } from '../../services/init';
import { Store } from '../../core/Store';
import Router from '../../core/Router';
import { areDeepEqual } from '../../utils/objects-utils';

type UserSettingsPageProps = {
  onCheck: FormUiValidator['onCheck'];
  fields: FieldControl[],
  reason: string;
  store: Store<AppState>;
  router: Router;
};

class UserSettingsPage extends Block<UserSettingsPageProps> {
  static componentName = 'UserSettingsPage';

  formValidator = new FormUiValidator() as FormUiValidator;

  $service: ProfileSerive;

  constructor(props: UserSettingsPageProps) {
    super({
      ...props,
      fields,
      onCheck: ({ valid, value, formName, name }) => (
        this.formValidator.onCheck({ 
          name, valid, value, formName, 
        })
      ),
    } as UserSettingsPageProps);


    this.$service = useServices(props.store, props.router, ProfileSerive)(ProfileSerive.name);
  }

  protected getStateFromProps(props: any): void {
    this.state = {
      ...props,
      form: {
        ...props.user,
      },

      onSubmit: () => this.onChangeUser(),
    };
  }

  onChangeUser = () => {

    const form = this.element!.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', (evt) => evt.preventDefault());

    this.formValidator.vaidateOnSubmit(this.refs);

    const hasNoValue = ['button', 'hintError'];
    
    Object.keys(this.refs).forEach((key) => {
      if (!hasNoValue.includes(key)) {
        const { value } = this.refs[key].refs.input.getContent() as HTMLInputElement;
        this.state.user[key] = value;
      }
    });


    this.$service.changeUserProfie(
      this.state.user,
    );
  };



  _renderControls() {
    return this.props.fields.map(
      ({ placeholder, formName, name, validate, type, error }, i) => (
        `{{{Input 
            id="${i}" 
            placeholder="${placeholder}" 
            formName="${formName}" 
            ref="${formName}" 
            type="${type}" 
            error="${error}" 
            validate="${validate}" 
            name="${name}" 
            variant="main"
            value="${this.state.user[formName] ?? ''}"
            onCheck=onCheck 
        }}}`
      ),
    )
      .join(' ');
  }

  componentDidUpdate(oldProps: UserSettingsPageProps, newProps: UserSettingsPageProps): boolean {
    if (!areDeepEqual(oldProps, newProps)) {
      this.refs.hintError.setProps({
        errorMessage: this.props.reason,
      });
    }

    return false;
  }
 
  render() {
    return (      
      `<main class="content-center">
        {{{BackToView href="/user"}}}
        <div class="user-page">
          <div class="user-page__avatar">
            {{{Avatar src=user.avatar}}}
            <h1></h1>
          </div>
          
          {{{InputHint ref="hintError" errorMessage=reason }}}
          <form>
            <ul class="user-page__list"> 
            ${ this._renderControls() }
            <div class="user-page__footer">
              {{{Button content="Сохранить" onClick=onSubmit variant="main"}}}
            </div>
          </form>

          </div>
      </main>
      `
    );
  }
}


function useSettingsSelector({ user, reason }: AppState) {
  return {
    reason,
    user: Object.assign({}, user, (!user?.avatar && { avatar: USER_DATA_MOCK.avatar })),
  };
}

// @ts-ignore
export default withStore(UserSettingsPage, useSettingsSelector);