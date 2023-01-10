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

  async post<T>(url: string, payload: any): Promise<T> {
    const result = await this.http.post(this.getPath(url), payload);

    if (result.response === 'OK') return result.response;

    return JSON.parse(result.response) as T;
  }

  get(url: string) {
    return this.http.get(this.getPath(url), {
      withCredentials: true,
    });
  }

  put(url: string, options?: {}) {
    return this.http.put(this.getPath(url), options);
  }
}