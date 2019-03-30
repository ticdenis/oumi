import { Oumi } from '@oumi-package/core/lib';
import { UserRegistrationData } from '@oumi-package/user/lib';
export declare const resolvers: {
  Mutation: {
    userRegistration: (
      _: any,
      args: {
        input: UserRegistrationData;
      },
      context: {
        container: Oumi.Container;
      },
    ) => Promise<any>;
  };
  Query: {
    hello: () => string;
  };
};
//# sourceMappingURL=resolvers.d.ts.map
