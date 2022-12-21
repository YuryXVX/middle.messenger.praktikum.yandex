import Block from '../../core/Block';


export default class RegistrationPage extends Block {
  render() {
    return (
      `<main class="content-center app__page">
        <form class="form">
          <div class="form__wrap">
            <legend class="form__title-legend">Регистрация</legend>
            <fieldset class="form__fieldset">
              {{{Input placeholder="Почта" name="email" variant="main" }}}
            </fieldset>
            
            <fieldset class="form__fieldset">
              {{{Input placeholder="Логин" name="login" variant="main" }}}
            </fieldset>

            <fieldset class="form__fieldset">
              {{{Input placeholder="Имя" name="first_name" variant="main" }}}
            </fieldset>

            <fieldset class="form__fieldset">
              {{{Input placeholder="Фамилия" name="second_name" variant="main"}}}
            </fieldset>

            <fieldset class="form__fieldset">
              {{{Input placeholder="Телефон" name="phone" variant="main"}}}
            </fieldset>

            <fieldset class="form__fieldset">
              {{{Input placeholder="Пароль" type="password" name="password" variant="main"}}}
            </fieldset>

            <fieldset class="form__fieldset">
              {{{Input placeholder="Пароль (еще раз)" type="password" variant="main"}}}
            </fieldset>

            <div class="form__buttons">
              {{{Button content="Зарегистрироваться" variant="main"}}}
              {{{Link content="Войти" href="/" variant="block"}}}
            </div>
          </div>
        </form>
      </main>`
    )
  }
}
