import { CommandHandler, Oumi } from '@oumi-package/core/lib';
export declare type MakeCommandHandler = (container: Oumi.Container) => [string, CommandHandler<any>];
export declare type CommandHandlers = (container: Oumi.Container) => [string, CommandHandler<any>][];
export declare const COMMAND_HANDLERS: CommandHandlers;
//# sourceMappingURL=index.d.ts.map