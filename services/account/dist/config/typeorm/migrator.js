"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrator = {
    migrate: conn => async (migrations) => {
        await Promise.all(migrations.map(migration => migration.up(conn.createQueryRunner())));
    },
    rollback: conn => async (migrations) => {
        await Promise.all(migrations.map(migration => migration.down(conn.createQueryRunner())));
    },
};
//# sourceMappingURL=migrator.js.map