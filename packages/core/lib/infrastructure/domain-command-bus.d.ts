import { Command, CommandBus, CommandHandler } from '../domain';
export declare class DomainCommandBus implements CommandBus {
    static instance(): DomainCommandBus;
    private static _instance;
    private _commandHandlers;
    addHandler(commandName: string, commandHandler: CommandHandler<any>): void;
    dispatch<T>(command: Command<T>): Promise<void>;
}
//# sourceMappingURL=domain-command-bus.d.ts.map