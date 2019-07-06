import { stringVO, uuidVO } from './';

// Types

export interface Message {
  readonly id: string;
  readonly type: string;
}

// Helpers

export const message = (): Message => ({
  id: uuidVO().value,
  type: stringVO('message').value,
});
