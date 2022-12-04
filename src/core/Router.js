
// минорная версия роутера - захардкожены элементы навигации в html вместо компонента <Link />
export default class Router {
  constructor(routes, root) {
    this.routes = routes;
    this.root = root;

    this.initListeners();
  }

  static instance(routes, root) {
    if (!this._instance) {
      this._instance = new Router(routes, root);
    }
    return this._instance;
  }

  handleClickLink(href) {
    const { pathname } = new URL(href);
    this.navigate(pathname);
  }

  initListeners() {
    // пока захардкожены дата-атрибуты для ссылок
    window.addEventListener('click', (evt) => {
      const { target } = evt;
      const link = target.closest('[data-nav]');

      if(link) {
        evt.preventDefault();
        const { href } = link;
        this.handleClickLink(href);
      }
    })
  }

  async route() {
    let pathname = decodeURI(window.location.pathname);

    let match;
  
    for (const [path, page] of Object.entries(this.routes)) {
      match = pathname === path;

      if(match) {
        this.changePage(page);
        break;
      }
    }

    if (!match) {
      const notFoundPage = this.routes['/not-found'];
      this.changePage(notFoundPage);
      return;
    }
  }

  changePage(Page) {
    if (this.page && this.page.destroy) {
      this.page.destroy();
    }

    return this.render(Page);
  }

  render(Page) {
    this.page = new Page(root);
    this.root.append(this.page.render());
  }

  navigate(path) {
    history.pushState(null, null, path);
    this.route();
  }

  listen() {
    window.addEventListener('popstate', () => this.route());
    this.route();
  }
}
