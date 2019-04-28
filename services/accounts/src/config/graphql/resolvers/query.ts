import { profileQueryResolver } from '../../../cases/profile';
import { userContactsQueryResolver } from '../../../cases/user-contacts';
import { userTokenQueryResolver } from '../../../cases/user-token';

export const QUERY_RESOLVER = {
  profile: profileQueryResolver,
  userContacts: userContactsQueryResolver,
  userToken: userTokenQueryResolver,
};
