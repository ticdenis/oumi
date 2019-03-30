"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = require("./config");
async function main({ appLoader, containerLoader, envLoader, loggerLoader, readDBLoader, writeDBLoader, }) {
    const container = await containerLoader();
    const env = await envLoader();
    container.set(config_1.SERVICE_ID.ENV, env);
    const readDB = await readDBLoader(env);
    await readDB.connect();
    container.set(config_1.SERVICE_ID.DB.READ, readDB);
    const writeDB = await writeDBLoader(env);
    await writeDB.connect();
    container.set(config_1.SERVICE_ID.DB.WRITE, writeDB);
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
        envLoader: () => Promise.resolve(config_1.loadEnvironment()),
        loggerLoader: container => Promise.resolve(config_1.loadLogger(container)),
        readDBLoader: env => Promise.resolve(config_1.loadReadDatabase(env)),
        writeDBLoader: env => Promise.resolve(config_1.loadWriteDatabase(env)),
    })
        .catch(console.error);
}
//# sourceMappingURL=main.js.map