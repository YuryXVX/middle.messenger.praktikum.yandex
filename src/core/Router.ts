import Block from "./Block";

// минорная версия роутера - захардкожены элементы навигации в html вместо компонента <Link />
export default class Router {
  routes: Record<string, typeof Block>
  root: HTMLElement;
  page: Block | null;

  static _instance: Router | null;

  constructor(routes: Record<string, typeof Block>, root: HTMLElement) {
    this.routes = routes;
    this.root = root;
    this.page = null;

    this.initListeners();
  }

  static instance(routes: Record<string, typeof Block>, root: HTMLElement) {
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
    window.addEventListener('click', (evt: MouseEvent) => {
      const targetElement = evt.target as Element;
      const link = targetElement.closest('[data-nav]') as HTMLLinkElement;

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

  changePage(Page: typeof Block) {
    if (this.page && this.page.destroy) {
      this.page.destroy();
    }

    return this.render(Page);
  }

  render(Page: typeof Block) {
    this.page = new Page({});
    this.root.append(this.page!.getContent());
  }

  navigate(path) {
    history.pushState(null, 'null', path);
    this.route();
  }

  listen() {
    window.addEventListener('popstate', () => this.route());
    this.route();
  }
}
