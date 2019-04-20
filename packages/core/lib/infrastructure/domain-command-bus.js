"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../domain");
class DomainCommandBus {
    constructor() {
        this._commandHandlers = new Map();
    }
    static instance() {
        if (null === DomainCommandBus._instance) {
            DomainCommandBus._instance = new this();
        }
        return DomainCommandBus._instance;
    }
    addHandler(commandName, commandHandler) {
        this._commandHandlers.set(commandName, commandHandler);
    }
    async dispatch(command) {
        if ('command' !== command.type) {
            return Promise.reject(new domain_1.CommandDomainError('INVALID_COMMAND_TYPE', `Argument received not is a command is a <${command.type}>.`));
        }
        if (!this._commandHandlers.has(command.name)) {
            return Promise.reject(new domain_1.CommandDomainError('COMMAND_NOT_FOUND', `Command Handler for <${command.name}> not found.`));
        }
        await this._commandHandlers.get(command.name)(command);
    }
}
DomainCommandBus._instance = null;
exports.DomainCommandBus = DomainCommandBus;
//# sourceMappingURL=domain-command-bus.js.map