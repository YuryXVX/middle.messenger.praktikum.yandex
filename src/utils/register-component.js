import Handlebars from "handlebars";

export const registerComponent = (components) => {
  for(const [name, component] of Object.entries(components)) {
    Handlebars.registerPartial(name, component);
  }
}
