"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Command {
    constructor(data) {
        this.data = data;
        this.id = _1.uuidVO().value;
        this.name = this.constructor.name;
        this.occurredOn = new Date();
        this.type = _1.stringVO('command').value;
    }
}
exports.Command = Command;
exports.dispatcher = (commandBus) => async (command) => {
    await commandBus.dispatch(command);
};
//# sourceMappingURL=command.js.map