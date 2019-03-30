"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.UserEntity = new typeorm_1.EntitySchema({
    columns: {
        created_at: {
            createDate: true,
            type: Date,
        },
        email: {
            type: String,
            unique: true,
        },
        firstname: {
            type: String,
        },
        id: {
            generated: 'uuid',
            primary: true,
            type: String,
        },
        lastname: {
            type: String,
        },
        nickname: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        phone: {
            type: String,
        },
        updated_at: {
            type: Date,
            updateDate: true,
        },
    },
    name: 'user',
    tableName: 'users',
});
//# sourceMappingURL=user.js.map