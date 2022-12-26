let current = null as null | HTMLElement;

export const toggleClasses = (ref: HTMLElement, className: string): () => void => {
  if (current) {
    current.classList.remove(className);
  }

  current = ref;
  current.classList.add(className);

  return function cleanup() {
    current = null;
  };
};
