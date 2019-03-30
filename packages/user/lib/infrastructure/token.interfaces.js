"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const TaskEither_1 = require("fp-ts/lib/TaskEither");
const jwt_simple_1 = require("jwt-simple");
const domain_1 = require("../domain");
exports.simpleJWTFactory = ({ secret, expiration, issuer, }) => ({
    build: user => {
        const payload = {
            exp: expiration,
            iat: Date.now(),
            issuer,
            sub: user.id.value,
        };
        try {
            return TaskEither_1.fromEither(Either_1.right(jwt_simple_1.encode(payload, secret)));
        }
        catch (err) {
            return TaskEither_1.fromEither(Either_1.left(domain_1.TokenDomainError.invalidPayload(payload)));
        }
    },
});
exports.simpleJWTReader = secret => ({
    read: token => {
        try {
            const payload = jwt_simple_1.decode(token, secret);
            return TaskEither_1.fromEither(payload.exp <= Date.now()
                ? Either_1.right(domain_1.userIdVO(payload.sub))
                : Either_1.left(domain_1.TokenDomainError.notValid(token)));
        }
        catch (error) {
            return TaskEither_1.fromEither(Either_1.left(domain_1.TokenDomainError.notValid(token)));
        }
    },
});
//# sourceMappingURL=token.interfaces.js.map