import { Oumi } from '@oumi-package/core/lib';

import { Connection, createConnection } from 'typeorm';

import { Environment } from '..';
import { DomainEventEntity, UserEntity } from '../../entity/typeorm';

export const loadReadDatabase = (env: Environment): Oumi.Database => {
  let db: Connection;

  return {
    connect: async <T = Connection>() => {
      if (!db) {
        db = await createConnection({
          database: env.READ_DATABASE_DATABASE,
          entities: [DomainEventEntity],
          host: env.READ_DATABASE_HOST,
          logging: false,
          name: 'READ',
          password: env.READ_DATABASE_PASSWORD,
          port: env.READ_DATABASE_PORT,
          synchronize: env.READ_DATABASE_SYNCHRONIZE === 'true',
          type: env.READ_DATABASE_CONNECTION as any,
          username: env.READ_DATABASE_USERNAME,
        });
      }

      return (db as unknown) as T;
    },
    connection: <T = Connection | null>() => (db as unknown) as T,
    disconnect: () => (db ? db.close() : Promise.resolve()),
    isConnected: () => Promise.resolve(db ? db.isConnected : false),
  };
};

export const loadWriteDatabase = (env: Environment): Oumi.Database => {
  let db: Connection;

  return {
    connect: async <T = Connection>() => {
      if (!db) {
        db = await createConnection({
          database: env.WRITE_DATABASE_DATABASE,
          entities: [UserEntity],
          host: env.WRITE_DATABASE_HOST,
          logging: false,
          name: 'WRITE',
          password: env.WRITE_DATABASE_PASSWORD,
          port: env.WRITE_DATABASE_PORT,
          synchronize: env.WRITE_DATABASE_SYNCHRONIZE === 'true',
          type: env.WRITE_DATABASE_CONNECTION as any,
          username: env.WRITE_DATABASE_USERNAME,
        });
      }

      return (db as unknown) as T;
    },
    connection: <T = Connection | null>() => (db as unknown) as T,
    disconnect: () => (db ? db.close() : Promise.resolve()),
    isConnected: () => Promise.resolve(db ? db.isConnected : false),
  };
};
