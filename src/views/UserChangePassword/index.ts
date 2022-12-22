import Block from '../../core/Block';

import { USER_DATA_MOCK } from '../../constants';
import { pick } from '../../utils/objects-utils';

export default class ChangePasswordPage extends Block {
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
        },
        { 
          placeholder: 'Новый Пароль',
          type: 'password',
          name: 'password',
          error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
          validate: true,
        } 
      ],
    })
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

        <div>
          <ul class="user-page__list"> 
            ${
              this.props.fields.map(({placeholder, validate, name,  error}, index) => {
                return (
                  `<li>
                    <span>${placeholder}</span>
                    {{{Input placeholder="${placeholder}" name="${name}" id="${index}" error="${error}" validate="${validate}" type="password"}}}
                  </li>`
                )
              })
              .join(' ')
            }
          </ul>
        </div>

        <div class="user-page__footer">
          {{{Button content="Сохранить" variant="main"}}}
      </div>
    </main>
    `)
  }
}


// <li>
// <span>Старый пароль</span>
// {{{Input variant="borderless" value="password" type="password"}}}
// </li> 
// <li>
// <span>Новый пароль</span>
// {{{Input variant="borderless" value="password" type="password"}}}
// </li> 
// <li>
// <span>Повторите новый пароль</span>
// {{{Input variant="borderless" value="password" type="password"}}}
// </li> 