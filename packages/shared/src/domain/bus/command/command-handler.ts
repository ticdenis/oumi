import { Command } from './command';

export type CommandHandler<T extends Command<any>> = (
  command: T,
) => Promise<void>;
