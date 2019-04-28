import {
  confirmDebtRequestBuilderService,
  ConfirmDebtRequestCommand,
  confirmDebtRequestHandler,
} from '@oumi-package/debt/lib/application';
import {
  DebtCommandRepository,
  DebtQueryRepository,
} from '@oumi-package/debt/lib/domain';
import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const CONFIRM_DEBT_REQUEST_COMMAND = ConfirmDebtRequestCommand.name;

export const CONFIRM_DEBT_REQUEST_COMMAND_HANDLER = (
  container: Oumi.Container,
) =>
  confirmDebtRequestHandler(
    confirmDebtRequestBuilderService({
      commandRepository: container.get<DebtCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.DEBT,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<DebtQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.DEBT,
      ),
    }),
  );
