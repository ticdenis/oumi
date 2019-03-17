import { Container as InversifyContainer } from 'inversify';

import { ContainerLoader, ServiceId } from '../dsl';

export const containerLoader: ContainerLoader = () => {
  const container = new InversifyContainer();

  return Promise.resolve({
    get: container.get.bind(container),
    set: <T>(id: ServiceId, value: T) => {
      container.bind<T>(id).toConstantValue(value);
    },
    setAsync: <T>(id: ServiceId, fn: (context?: any) => T | Promise<T>) => {
      container.bind<T>(id).toDynamicValue(fn.bind(container));
    },
  });
};
