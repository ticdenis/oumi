import { Oumi } from '@oumi-package/core';

import { Container } from 'inversify';

export const loadContainer = (): Oumi.Container => {
  const container = new Container();

  return {
    get: container.get.bind(container),
    getAsync: <T>(id: Oumi.ServiceId<T>) =>
      Promise.resolve(container.get(id) as T | null),
    set: <T>(id: Oumi.ServiceId<T>, value: T) => {
      container.bind<T>(id).toConstantValue(value);
    },
    setAsync: <T>(
      id: Oumi.ServiceId<T>,
      fn: (context?: any) => T | Promise<T>,
    ) => {
      container.bind<T>(id).toDynamicValue(fn.bind(container));
    },
  };
};
