import { createConnection } from 'typeorm';

import { DatabaseLoader } from '../dsl';
import { UserEntity } from '../entity';

export const dbLoader: DatabaseLoader = env =>
  createConnection({
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
