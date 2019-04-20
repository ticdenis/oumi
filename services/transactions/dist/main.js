"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = require("./config");
async function main({ appLoader, containerLoader, dbLoader, envLoader, loggerLoader, }) {
    const container = await containerLoader();
    const env = await envLoader();
    container.set(config_1.SERVICE_ID.ENV, env);
    const db = await dbLoader(env);
    await db.connect();
    container.set(config_1.SERVICE_ID.DB, db);
    const logger = await loggerLoader(container);
    container.set(config_1.SERVICE_ID.LOGGER, logger);
    const app = await appLoader(container);
    app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () => logger.log(`Listening at http://localhost:${env.APP_PORT}`));
}
exports.main = main;
if (require.main === module) {
    main({
        appLoader: container => Promise.resolve(config_1.loadApplication(container)),
        containerLoader: () => Promise.resolve(config_1.loadContainer()),
        dbLoader: env => Promise.resolve(config_1.loadDatabase(env)),
        envLoader: () => Promise.resolve(config_1.loadEnvironment()),
        loggerLoader: container => Promise.resolve(config_1.loadLogger(container)),
    })
        .catch(console.error);
}
//# sourceMappingURL=main.js.map