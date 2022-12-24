import Block from '../../core/Block';

import './styles.scss';

export class Spinner extends Block {
  protected componentName = 'Spinner';

  render() {
    return (`
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `);
  }
}