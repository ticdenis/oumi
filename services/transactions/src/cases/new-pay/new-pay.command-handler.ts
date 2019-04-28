import {
  newPayBuilderService,
  NewPayCommand,
  newPayHandler,
} from '@oumi-package/payment/lib/application';
import {
  PaymentCommandRepository,
  PaymentQueryRepository,
} from '@oumi-package/payment/lib/domain';
import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const NEW_PAY_COMMAND = NewPayCommand.name;

export const NEW_PAY_COMMAND_HANDLER = (container: Oumi.Container) =>
  newPayHandler(
    newPayBuilderService({
      commandRepository: container.get<PaymentCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.PAYMENT,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<PaymentQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.PAYMENT,
      ),
    }),
  );
