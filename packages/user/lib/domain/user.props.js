"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oumi-package/core");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
exports.userEmailVO = core_1.stringVO;
exports.userFirstnameVO = core_1.stringVO;
exports.userIdVO = core_1.uuidVO;
exports.userLastnameVO = core_1.stringVO;
exports.userNicknameVO = core_1.stringVO;
const HASH_SALTS = 10;
exports.userPasswordVO = (value, encrypt = true) => {
    const _value = encrypt
        ? bcrypt_1.default.hashSync(core_1.stringVO(value).value, HASH_SALTS)
        : value;
    return {
        equalsTo: other => bcrypt_1.default.compareSync(other.value, _value),
        value: _value,
    };
};
exports.userPhoneVO = core_1.stringVO;
//# sourceMappingURL=user.props.js.map