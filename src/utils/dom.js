export const createDomNode = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstElementChild;
}
