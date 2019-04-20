import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { changePasswordRouter } from '../../features/change-password';
import { healthzRouter } from '../../features/healthz';
import { newContactRequestRouter } from '../../features/new-contact-request';
import { profileRouter } from '../../features/profile';
import { rootRouter } from '../../features/root';
import { updateProfileRouter } from '../../features/update-profile';
import { userContactsRouter } from '../../features/user-contacts';
import { userRegistrationRouter } from '../../features/user-registration';
import { userTokenRouter } from '../../features/user-token';

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
}
