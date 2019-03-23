import { Oumi } from '@oumi-package/core/lib';

import { Container } from 'inversify';

export const loadContainer = (): Oumi.Container => {
  const container = new Container();

  return {
    get: container.get.bind(container),
    getAsync: <T>(id: Oumi.ServiceId) =>
      Promise.resolve(container.get(id) as T | null),
    set: <T>(id: Oumi.ServiceId, value: T) => {
      container.bind<T>(id).toConstantValue(value);
    },
    setAsync: <T>(
      id: Oumi.ServiceId,
      fn: <C = any>(context?: C) => T | Promise<T>,
    ) => {
      container.bind<T>(id).toDynamicValue(fn.bind(container));
    },
  };
};
