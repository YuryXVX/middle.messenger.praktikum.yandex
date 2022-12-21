import Block from '../../core/Block';

export default class ErrorPage extends Block {
  render() {
    return (`
      <main class="app__page content-center not-found">
        <div class="not-found__content">
          <h3>500</h3>
          <p>Мы уже фиксим</p>
          {{{Link content="Назад к чатам" href="/"}}}
        </div>
      </main>
    `)
  }
}
