import Block from "../../core/Block";

export class InputHint extends Block {
  constructor(props) {
    super(props)
  }

  render() {
    return (`
      <span class="chat__input-text-error">{{errorMessage}}</span>
    `)
  }
}