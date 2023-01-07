import Block from './Block';

// минорная версия роутера - захардкожены элементы навигации в html вместо компонента <Link />
export default class Router {
  routes: any[];

  root: HTMLElement;

  page: Block | null;

  prevPage: Block | null;

  store: any;

  next: (route?: any, instance?: Router) => boolean;

  static _instance: Router | null;

  constructor(
    routes: any[], root: HTMLElement, next: (route?: any, instance?: Router) => boolean, store: any) {
    this.routes = routes;
    this.root = root;
    this.page = null;

    this.store = store;


    this.next = next;

    this.initListeners();
  }

  static instance(
    routes: any[], root: HTMLElement, next: (route?: any, instance?: Router) => boolean, store: any) {
    if (!this._instance) {
      this._instance = new Router(routes, root, next, store);
    }
    return this._instance;
  }

  handleClickLink(href: string) {
    const { pathname } = new URL(href);
    this.navigate(pathname);
  }

  initListeners() {
    // пока захардкожены дата-атрибуты для ссылок
    window.addEventListener('click', (evt: MouseEvent) => {
      const targetElement = evt.target as Element;
      const link = targetElement.closest('[data-nav]') as HTMLLinkElement;

      if (link) {
        evt.preventDefault();
        const { href } = link;
        this.handleClickLink(href);
      }
    });
  }

  async route() {
    let pathname = decodeURI(window.location.pathname);

    let match;

  
    for (const route of this.routes) {
      match = pathname === route.path;

      if (this.next(route, this) && match) {
        this.changePage(route.component);
        break;
      }
    }
  }

  changePage(Page: typeof Block) {
    if (this.page && this.page.destroy) {
      this.page.destroy();
    }

    return this.render(Page);
  }

  render(Page: typeof Block) {
    if (!this.prevPage) {
      this.prevPage = new Page({});
    }

    this.page = new Page({ router: this });
    this.root.append(this.page!.getContent());
  }

  navigate(path: string) {
    history.pushState(null, 'null', path);
    this.route();
  }

  listen() {
    window.addEventListener('popstate', () => this.route());
    this.route();
  }
}
