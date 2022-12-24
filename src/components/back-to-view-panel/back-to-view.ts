import Block from '../../core/Block';

import './styles.scss';

export class BackToView extends Block {
  protected componentName = 'BackToView';

  render() {
    return (
      `<div class="back-to__panel app__page">
        {{{Link content="" href="{{href}}" class="back-to__button-link"}}}
      </div>`
    );
  }
}
