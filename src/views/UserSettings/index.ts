import Block from '../../core/Block';

import { USER_DATA_MOCK } from '../../constants';
import { omit } from '../../utils/objects-utils';

export default class UserSettingsPage extends Block {
  constructor() {
    super(omit(USER_DATA_MOCK, ['password']))
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
          
          <div>
            <ul class="user-page__list"> 
              <li>
                <span>Почта</span>
                {{{Input variant="borderless" value=email type="emial"}}}
              </li> 
              <li>
                <span>Логин</span>
                {{{Input variant="borderless" value=login type="login"}}}
              </li> 
              <li>
                <span>Имя</span>
                {{{Input variant="borderless" value=firstName type="firstName"}}}
              </li>  
              <li>
                <span>Фамилия</span>
                {{{Input variant="borderless" value=lastName type="firstName"}}}
              </li>  
              <li>
                <span>Имя в чате</span>
                {{{Input variant="borderless" value=screenName type="firstName"}}}
              </li> 
              <li>
                <span>Телефон</span>
                {{{Input variant="borderless" value=phone type="firstName"}}}
              </li>       
            </ul>
          </div>
      
          <div class="user-page__footer">
            {{{Button content="Сохранить" variant="main"}}}
        </div>
      </main>
    
      `
    )
  }
}
