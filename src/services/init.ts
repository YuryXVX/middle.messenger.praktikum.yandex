import Router from '../core/Router';
import { Store } from '../core/Store';

const servicesCache = new Map<string, any>();

export const useServices = <T extends object = any>(
  // @ts-ignore
  store: Store<AppState>, router: Router, Service: typeof T): (serviceName: string) => T => {
  //@ts-ignore
  const hasCache = servicesCache.has(Service.name);

  return (service: string) => {
    if (!hasCache) {
      // @ts-ignore
      servicesCache.set(service, new Service(store, router));
    }

    return servicesCache.get(service);
  };
};