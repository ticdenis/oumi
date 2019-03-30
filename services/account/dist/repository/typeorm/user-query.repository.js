"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oumi-package/user/lib");
const TaskEither_1 = require("fp-ts/lib/TaskEither");
const config_1 = require("../../config");
const typeorm_1 = require("../../entity/typeorm");
class TypeORMUserQueryRepository {
    constructor(container) {
        this._repository = container
            .get(config_1.SERVICE_ID.DB.WRITE)
            .connection()
            .getRepository(typeorm_1.UserEntity);
    }
    ofEmail(email) {
        return TaskEither_1.tryCatch(() => this._repository
            .findOneOrFail({
            where: { email: email.value },
        })
            .then(rawUser => this._map(rawUser)), () => null);
    }
    ofId(id) {
        return TaskEither_1.tryCatch(() => this._repository
            .findOneOrFail(id.value)
            .then(rawUser => this._map(rawUser)), () => null);
    }
    _map(data) {
        return new lib_1.User({
            email: lib_1.userEmailVO(data.email),
            firstname: lib_1.userFirstnameVO(data.firstname),
            id: lib_1.userIdVO(data.id),
            lastname: lib_1.userLastnameVO(data.lastname),
            nickname: lib_1.userNicknameVO(data.nickname),
            password: lib_1.userPasswordVO(data.password, false),
            phone: lib_1.userPhoneVO(data.phone),
        });
    }
}
exports.TypeORMUserQueryRepository = TypeORMUserQueryRepository;
//# sourceMappingURL=user-query.repository.js.map