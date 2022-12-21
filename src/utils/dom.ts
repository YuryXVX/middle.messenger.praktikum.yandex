import { toggleClasses } from "./styles-utils";

function createDomNode (template: string): Element | null  {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstElementChild;
}

function replceChildNodes(parent: HTMLElement, newNode) {
  if(parent.firstElementChild) {
    parent.replaceChild(newNode, parent.firstElementChild);
  }
}

function removeAttribute(node: HTMLElement, attribute: string) {
  node.removeAttribute(attribute)
}

function setAttribute(node: HTMLElement, attribute: string, value = 'true' as string) {
  node.setAttribute(attribute, value);
}

export const DomUtils = {
  createDomNode,
  toggleClasses,
  replceChildNodes,
  removeAttribute,
  setAttribute,
}