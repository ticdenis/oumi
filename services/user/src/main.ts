import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import * as t from 'io-ts';
import morgan from 'morgan';
import * as R from 'ramda';

import {
  userRegistration,
  userRegistrationCommand,
  userRegistrationCommandHandler,
} from './application/registration';
import {
  UserCommandRepository,
  UserQueryRepository,
} from './domain/repository';

export interface Environment {
  APP_PORT: string;
}

export const loadDotenvEnvironmentVariables = (): Promise<Environment> =>
  Promise.resolve(R.mergeDeepRight(
    R.defaultTo(dotenv.load().parsed, {}),
    process.env,
  ) as any);

export const loadExpressApplication = (): Promise<express.Application> => {
  const app = express();

  app.use(helmet());

  app.use(morgan('combined'));

  app.use(express.json());

  app.get('/healthz', (_, res) => res.status(200).send('Ready!'));

  app.post('/users', async (req, res) => {
    const validation = t
      .interface({
        email: t.string,
        firstname: t.string,
        id: t.string,
        lastname: t.string,
        password: t.string,
      })
      .decode(req.body); // Use UserRegistrationInput!

    if (validation.isLeft()) {
      res.status(400).json(validation.value);
      return;
    }

    const input = validation.value;

    const repository = {
      // tslint:disable-next-line:no-object-literal-type-assertion
      command: {
        create(_) {
          return Promise.resolve();
        },
      } as UserCommandRepository,
      // tslint:disable-next-line:no-object-literal-type-assertion
      query: {
        ofEmail(_) {
          return Promise.resolve(null);
        },
      } as UserQueryRepository,
    };

    const service = userRegistration(repository.query, repository.command);
    const commandHandler = userRegistrationCommandHandler(service);
    const command = userRegistrationCommand(input);

    try {
      await commandHandler(command);

      res.status(201).json();
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      res.status(500).send(err.message);
    },
  );

  return Promise.resolve(app);
};

async function main() {
  const env = await loadDotenvEnvironmentVariables();
  const app = await loadExpressApplication();

  app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    // tslint:disable-next-line:no-console
    console.log(
      `@oumi-service/user is listening at http://localhost:${env.APP_PORT}!`,
    ),
  );
}

if (require.main === module) {
  // tslint:disable-next-line:no-console
  main().catch(console.error);
}
