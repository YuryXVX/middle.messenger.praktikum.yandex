import Block from '../../core/Block';

import './styles.scss';

export default class NotFoundPage extends Block {
  render() {
    return (
      `<main class="app__page content-center not-found">
        <div class="not-found__content">
          <h3>404</h3>
          <p>Не туда попали</p>
          {{{Link content="Назад к чатам" href="/"}}}
        </div>
      </main>
      `
    )
  }
}
