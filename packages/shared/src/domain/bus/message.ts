import { stringVO, uuidVO } from '..';

export interface Message {
  readonly id: string;
  readonly type: string;
}

export const message = (): Message => ({
  id: uuidVO().value,
  type: stringVO('message').value,
});
