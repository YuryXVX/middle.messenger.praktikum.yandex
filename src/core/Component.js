import { createDomNode } from '../utils/dom';

// минорная версия базвого класса компонента (нужно только для рендера экранов)
export default class Component {
  constructor() {
    this._element = null;
  }

  compile(template) {
    this._element = createDomNode(template);
    return this._element;
  }

  render() {}

  destroy() {
    this._element && this._element.remove();
    this._element = null;
  }
}
