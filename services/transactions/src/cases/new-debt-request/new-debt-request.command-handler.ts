import {
  newDebtRequestBuilderService,
  NewDebtRequestCommand,
  newDebtRequestHandler,
} from '@oumi-package/movement/lib/application';
import {
  DebtCommandRepository,
  DebtQueryRepository,
} from '@oumi-package/movement/lib/domain';
import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const NEW_DEBT_REQUEST_COMMAND = NewDebtRequestCommand.name;

export const NEW_DEBT_REQUEST_COMMAND_HANDLER = (container: Oumi.Container) =>
  newDebtRequestHandler(
    newDebtRequestBuilderService({
      commandRepository: container.get<DebtCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.DEBT,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<DebtQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.DEBT,
      ),
    }),
  );
