import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { changePasswordRouter } from '../../cases/change-password';
import { confirmContactRequestRouter } from '../../cases/confirm-contact-request';
import { contactRequestsRouter } from '../../cases/contact-requests';
import { denyContactRequestRouter } from '../../cases/deny-contact-request';
import { healthzRouter } from '../../cases/healthz';
import { newContactRequestRouter } from '../../cases/new-contact-request';
import { profileRouter } from '../../cases/profile';
import { rootRouter } from '../../cases/root';
import { updateProfileRouter } from '../../cases/update-profile';
import { userContactsRouter } from '../../cases/user-contacts';
import { userRegistrationRouter } from '../../cases/user-registration';
import { userTokenRouter } from '../../cases/user-token';

export function loadRoutes(
  app: express.Application,
  container: Oumi.Container,
) {
  app.get('/', rootRouter(container));

  app.get('/healthz', healthzRouter(container));

  app.post('/auth', userTokenRouter(container));

  app.get('/profile', profileRouter(container));

  app.get('/users/contacts', userContactsRouter(container));

  app.post('/users', userRegistrationRouter(container));

  app.put('/profile', updateProfileRouter(container));

  app.put('/password', changePasswordRouter(container));

  app.post('/contacts/requests', newContactRequestRouter(container));

  app.get('/contacts/requests', contactRequestsRouter(container));

  app.put('/contacts/requests/confirm', confirmContactRequestRouter(container));

  app.put('/contacts/requests/deny', denyContactRequestRouter(container));
}
