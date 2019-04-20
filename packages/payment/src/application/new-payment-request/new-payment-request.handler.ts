import { CommandHandler, eitherToPromise } from "@oumi-package/shared/lib/core";

import { NewPaymentRequestCommand, NewPaymentRequestService } from ".";

export type NewPaymentRequestCommandHandler = (
  service: NewPaymentRequestService
) => CommandHandler<NewPaymentRequestCommand>;

export const newPaymentRequestHandler: NewPaymentRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      // TODO: [key: string]: ValueObject<any> using command
    })
  );
