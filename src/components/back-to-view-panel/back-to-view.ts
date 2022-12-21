import Block from '../../core/Block';

import './styles.scss';

type BackToViewProps = {
  href: string;
}

export class BackToView extends Block {
  constructor(props: BackToViewProps) {
    super(props)
  }
  render() {
    return (
      `<div class="back-to__panel app__page">
        {{{Link content="" href="{{href}}" class="back-to__button-link"}}}
      </div>`
    )
  }
}
