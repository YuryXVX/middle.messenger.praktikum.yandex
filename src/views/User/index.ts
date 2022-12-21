import Block from '../../core/Block';
import { USER_DATA_MOCK } from '../../constants';

import './styles.scss';


export default class UserPage extends Block {
  constructor() {
    super(USER_DATA_MOCK)
  }
  render() {   
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
            {{{ListLtem key="Почта" value=email}}}       
            {{{ListItem key="Логин" value=login}}}      
            {{{ListItem key="Имя" value=firstName}}}
            {{{ListItem key="Фамилия" value=lastName}}}
            {{{ListItem key="Имя в чате" value=screenName}}}
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
              {{{Link content="Выйти" href="/auth"}}}
            </li>
          </ul>
        </div>
      </div>
    </main>
    `)
  }
}
