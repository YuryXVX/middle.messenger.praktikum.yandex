export function createDomNode(template: string): Element | null  {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstElementChild;
}

export function replceChildNodes(parent: HTMLElement, newNode: HTMLElement) {
  if (parent.firstElementChild) {
    parent.replaceChild(newNode, parent.firstElementChild);
  }
}

export function removeAttribute(node: HTMLElement, attribute: string) {
  node.removeAttribute(attribute);
}

export function setAttribute(node: HTMLElement, attribute: string, value = 'true' as string) {
  node.setAttribute(attribute, value);
}
