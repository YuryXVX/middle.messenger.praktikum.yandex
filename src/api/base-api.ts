import HTTPTrasnport from '../utils/HTTPTrasnport';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export default class BaseApi {
  http = new HTTPTrasnport(BASE_URL);

  path: string;

  constructor(path: string) {
    this.path = path;
  }

  getPath(url: string) {
    return `/${this.path}/${url}`;
  }

  post<P, U extends object>(url: string, payload: U): Promise<P> {
    return this.http.post<P, U>(this.getPath(url), payload);
  }

  get(url: string) {
    return this.http.get(this.getPath(url), {
      withCredentials: true,
    });
  }
}