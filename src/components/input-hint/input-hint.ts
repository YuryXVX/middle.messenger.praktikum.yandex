import Block from '../../core/Block';

export class InputHint extends Block {
  protected componentName = 'InputHint';

  render() {
    return (`
      <span class="chat__input-text-error">{{errorMessage}}</span>
    `);
  }
}
