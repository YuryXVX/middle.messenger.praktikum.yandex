import Block from "../../core/Block";

import './styles.scss';

export class Spinner extends Block {
  render() {
    return (`
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `)
  }
}