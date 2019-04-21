"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Query {
    constructor(data) {
        this.data = data;
        this.id = _1.uuidVO().value;
        this.name = this.constructor.name;
        this.occurredOn = new Date();
        this.type = _1.stringVO('query').value;
    }
}
exports.Query = Query;
exports.asker = (queryBus) => async (query) => {
    await queryBus.ask(query);
};
//# sourceMappingURL=query.js.map