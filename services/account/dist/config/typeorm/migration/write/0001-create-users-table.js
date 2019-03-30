"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateUsersTable {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            columns: [
                {
                    name: 'created_at',
                    type: 'date',
                },
                {
                    isUnique: true,
                    name: 'email',
                    type: 'string',
                },
                {
                    name: 'firstname',
                    type: 'string',
                },
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'uuid',
                },
                {
                    name: 'lastname',
                    type: 'string',
                },
                {
                    name: 'nickname',
                    type: 'string',
                },
                {
                    name: 'password',
                    type: 'string',
                },
                {
                    name: 'updated_at',
                    type: 'date',
                },
            ],
            name: `users`,
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(`users`, true, true, true);
    }
}
exports.CreateUsersTable = CreateUsersTable;
//# sourceMappingURL=0001-create-users-table.js.map