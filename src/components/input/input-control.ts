import Block from "../../core/Block";

export class InputControl extends Block {
  protected componentName = 'input';
  constructor(props) {
    super(props)
  }

  render() {
    return (`
        <input
          data-control="input"
          type="{{type}}" 
          id="{{id}}"
          name="{{name}}" 
          placeholder="{{placeholder}}"
          class="chat__input-control chat__input-control--{{variant}}"
          value="{{value}}"
        />
    `)
  }
}