import { CommandBus, Oumi } from '@oumi-package/core/lib';
import {
  UserRegistrationCommand,
  UserRegistrationData,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../config';

export const resolvers = {
  Mutation: {
    userRegistration: async (
      _: any,
      args: { input: UserRegistrationData },
      context: { container: Oumi.Container },
    ): Promise<any> => {
      await context.container
        .get<CommandBus>(SERVICE_ID.BUS.COMMAND)
        .dispatch(new UserRegistrationCommand(args.input));

      return null;
    },
  },
  Query: {
    hello: () => 'hello',
  },
};
