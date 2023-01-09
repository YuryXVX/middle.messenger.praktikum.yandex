import Block from './Block';

export type Route = {
  name: string;
  path: string,
  meta: Record<string, string | boolean>;
  component: typeof Block | any;
};

export type MiddleWare = (
  route: Route, { pathname, router }: { pathname: string; router: Router }) => boolean | void;

export default class Router {
  routes: Record<string, Route>;

  root: HTMLElement;

  page: Block | null;

  next: MiddleWare;

  prev: string | null;

  static _instance: Router | null;

  constructor(routes: any[], root: HTMLElement, next: MiddleWare) {
    this.routes = routes.reduce((acc, route) => {
      acc[route.path] = route;
      return acc;
    }, {});


    this.root = root;
    this.page = null;

    this.next = next;

    this.prev = null;

    this.initListeners();
  }

  static instance(
    routes: any[], root: HTMLElement, next: MiddleWare,
  ) {
    if (!this._instance) {
      this._instance = new Router(routes, root, next);
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
    let pathname = decodeURI(window.location.pathname) as string;

    let match;

  
    for (const [path, route] of Object.entries(this.routes)) {
      match = pathname === path;
    
      if (match) {
        if (this.next(route, { pathname, router: this })) {
          if (typeof route.meta.title === 'string') {
            window.document.title = route.meta.title;
          } 

          this.changePage(route.component);
        }
        
        break;
      }
    }
  }

  go(path: string) {
    const route = this.routes[path];

    if (route) {
      this.changePage(route.component);
      history.pushState(null, '', path);
    }
  }

  changePage(Page: typeof Block) {
    if (this.page && this.page.destroy) {
      this.page.destroy();
      this.page = null;
    }

    return this.render(Page);
  }

  render(Page: typeof Block) {
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
