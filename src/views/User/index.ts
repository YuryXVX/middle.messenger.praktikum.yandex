import Block from '../../core/Block';
import { useServices } from '../../services/init';
import { AuthService } from '../../services/AuthSerive';
import { Store } from '../../core/Store';
import { withStore } from '../../utils/hocs/withStore';
import { User } from '../../models/user';


import Router from '../../core/Router';

import './styles.scss';
import { USER_DATA_MOCK } from '../../constants';


type UserPageProps = {
  router: Router;
  user: User;
};

class UserPage extends Block {
  protected componentName = 'UserPage'; 

  $service: AuthService;

  $store: Store<AppState>;

  constructor(props: UserPageProps) {
    super(props);

    this.$service = useServices<AuthService>(this.$store, this.props.router, AuthService)(AuthService.name);
  }

  protected getStateFromProps(props: any): void {
    this.state = {
      ...props,
      onClick: () => this.signOut(),
    };
  }

  signOut() {
    this.$service.signOut();
  }

  render() {   
    console.log(this.props);
    // const { email } = this.state.user;

    // console.log(this.state.user);
    return (`
      <main class="content-center">
      {{{BackToButton href="/"}}}
      <div class="user-page">
        <div class="user-page__avatar">
          {{{Avatar src=avatar}}}
          <h3>{{screenName}}</h3>      
        </div>

        <div>
          <ul class="user-page__list">       
            {{{ListLtem key="Почта" value=email }}}       
            {{{ListItem key="Логин" value=login }}}      
            {{{ListItem key="Имя" value=firstName}}}
            {{{ListItem key="Фамилия" value=secondName}}}
            {{{ListItem key="Имя в чате" value=displayName}}}
            {{{ListItem key="Телефон" value=phone}}}
          </ul>
        </div>

        <div class="user-page__footer">
          <ul class="user-page__list">
            <li>
              {{{Link content="Изменить данные" href="/user-settings"}}}
            </li>
            <li>
              {{{Link content="Изменить пароль" href="/user-change-password"}}}
            </li{     
            <li>
              {{{Link content="Выйти" onClick=onClick }}}
            </li>
          </ul>
        </div>
      </div>
    </main>
    `);
  }
}

// @ts-ignore
const userSelector = ({ user }: AppState) => ({ 
  ...user, avatar: !user.avatar ? USER_DATA_MOCK.avatar : user.avatar,
});


export default withStore(UserPage, userSelector);