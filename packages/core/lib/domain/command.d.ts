import { Message } from './';
export declare type CommandHandler<T extends Command<any>> = (command: T) => Promise<void>;
export interface CommandBus {
    dispatch<T>(command: Command<T>): Promise<void>;
}
export declare abstract class Command<T> implements Message {
    readonly data: T;
    readonly id: string;
    readonly name: string;
    readonly occurredOn: Date;
    readonly type: string;
    constructor(data: T);
}
export declare const dispatcher: (commandBus: CommandBus) => <T>(command: Command<T>) => Promise<void>;
//# sourceMappingURL=command.d.ts.map