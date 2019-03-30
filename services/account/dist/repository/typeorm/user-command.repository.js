"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const typeorm_1 = require("../../entity/typeorm");
class TypeORMUserCommandRepository {
    constructor(container) {
        this._connection = container
            .get(config_1.SERVICE_ID.DB.WRITE)
            .connection();
    }
    async create(user) {
        await this._connection
            .createQueryBuilder()
            .insert()
            .into(typeorm_1.UserEntity)
            .values({
            email: user.email.value,
            firstname: user.firstname.value,
            id: user.id.value,
            lastname: user.lastname.value,
            nickname: user.nickname.value,
            password: user.password.value,
            phone: user.phone.value,
        })
            .execute();
    }
    async updateProfile(user) {
        await this._connection
            .createQueryBuilder()
            .update(typeorm_1.UserEntity)
            .set({
            firstname: user.firstname.value,
            lastname: user.lastname.value,
            nickname: user.nickname.value,
            phone: user.phone.value,
        })
            .where('id = :id', {
            id: user.id.value
        })
            .execute();
    }
}
exports.TypeORMUserCommandRepository = TypeORMUserCommandRepository;
//# sourceMappingURL=user-command.repository.js.map