import { contactRequestsQueryResolver } from '../../../cases/contact-requests';
import { profileQueryResolver } from '../../../cases/profile';
import { userContactsQueryResolver } from '../../../cases/user-contacts';
import { userTokenQueryResolver } from '../../../cases/user-token';

export const QUERY_RESOLVER = {
  contactRequests: contactRequestsQueryResolver,
  profile: profileQueryResolver,
  userContacts: userContactsQueryResolver,
  userToken: userTokenQueryResolver,
};
