import './styles.scss';
import Block from '../../core/Block';

export default class AuthPage extends Block {
  render() {
    return (
      `<main class="auth content-center app__page">
        <form class="form auth__form">
          <div class="form__wrap auth__from-wrap">
            <legend class="auth__form-title form__title-legend">Вход</legend>
            <fieldset class="form__fieldset">
              {{{Input placeholder="Логин" name="login" error=""}}}
            </fieldset>
            <fieldset class="form__fieldset">
              {{{Input placeholder="Пароль" type="password" name="password" variant="main"}}}
            </fieldset>
          </div>
      
          <div class="form__buttons">
            {{{Button content="Авторизоваться" type="button" variant="main"}}}
            {{{Link content="Нет аккаута?" href="/registration" variant="block"}}}
          </div>
        </form>
      </main>`    
    )
  }
}
