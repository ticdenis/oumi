"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oumi-package/core");
const domain_1 = require("../../domain");
exports.updateProfileHandler = service => async (command) => core_1.eitherToPromise(await service({
    firstname: domain_1.userFirstnameVO(command.data.firstname),
    id: domain_1.userIdVO(command.data.id),
    lastname: domain_1.userLastnameVO(command.data.lastname),
    nickname: domain_1.userNicknameVO(command.data.nickname),
    phone: domain_1.userPhoneVO(command.data.phone),
}));
//# sourceMappingURL=update-profile.handler.js.map