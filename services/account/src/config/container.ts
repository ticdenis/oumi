import { Container as InversifyContainer } from 'inversify';

import { ContainerLoader } from '../dsl';

export const containerLoader: ContainerLoader = () => {
  const container = new InversifyContainer();

  return Promise.resolve({
    get: container.get,
    set: (id: any, value: any) => {
      container.bind(id).to(value);
    },
  });
};
