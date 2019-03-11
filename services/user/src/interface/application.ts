import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';

import { ApplicationLoader } from './dsl';
import { healthReadinessGetController } from './health-readiness-get.controller';
import { userRegistrationPostController } from './user-registration-post.controller';

export const applicationLoader: ApplicationLoader<http.Server> = (
  env,
  container,
) => {
  const app = express();

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(express.json());

  app.get('/health-readiness', healthReadinessGetController(container));
  app.post('/users', userRegistrationPostController(container));

  // TODO: Check!
  // app.use((err: Error, _: express.Request, res: express.Response) => {
  //   res.status(500).send(err.message);
  // });

  return Promise.resolve(app as any);
};
