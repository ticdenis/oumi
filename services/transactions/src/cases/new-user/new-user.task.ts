import { Event, Oumi } from '@oumi-package/shared/lib/core';
import { UserRegistered } from '@oumi-package/user/lib/domain';

import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { UserEntity } from '../../config/typeorm/entity';

export const newUserTask = (container: Oumi.Container) => (
  event: Event<UserRegistered>,
): Promise<void> => {
  const connection = container
    .get<Oumi.Database>(SERVICE_ID.DB)
    .connection<Connection>();

  return connection
    .getRepository(UserEntity)
    .insert({ id: event.data.id })
    .then(undefined);
};
