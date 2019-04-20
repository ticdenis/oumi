import { profileQueryResolver } from '../../../features/profile';
import { userContactsQueryResolver } from '../../../features/user-contacts';
import { userTokenQueryResolver } from '../../../features/user-token';

export const QUERY_RESOLVER = {
  profile: profileQueryResolver,
  userContacts: userContactsQueryResolver,
  userToken: userTokenQueryResolver,
};
