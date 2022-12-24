import Block from '../../core/Block';

export class InputControl extends Block {
  protected componentName = 'InputControl';

  render() {
    return (`
        <input
          data-control="input"
          type="{{type}}" 
          id="{{id}}"
          name="{{name}}" 
          data-error="{{error}}"
          placeholder="{{placeholder}}"
          class="chat__input-control chat__input-control--{{variant}}"
          value="{{value}}"
        />
    `);
  }
}