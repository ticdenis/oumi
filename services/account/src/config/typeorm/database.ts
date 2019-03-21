import { Oumi } from '@oumi-package/core';

import { Connection, createConnection } from 'typeorm';

import { Environment } from '..';
import { UserEntity } from '../../entity';

export const loadDatabase = (env: Environment): Oumi.Database => {
  let db: Connection;

  return {
    connect: async <T = Connection>() => {
      if (!db) {
        db = await createConnection({
          database: env.DATABASE_DATABASE,
          entities: [UserEntity],
          host: env.DATABASE_HOST,
          logging: false,
          password: env.DATABASE_PASSWORD,
          port: env.DATABASE_PORT,
          synchronize: env.DATABASE_SYNCHRONIZE === 'true',
          type: env.DATABASE_CONNECTION as any,
          username: env.DATABASE_USERNAME,
        });
      }

      return (db as unknown) as T;
    },
    disconnect: () => (db ? db.close() : Promise.resolve()),
    isConnected: () => Promise.resolve(db ? db.isConnected : false),
  };
};
