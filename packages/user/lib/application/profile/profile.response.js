"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileDataTransformer = user => ({
    email: user.email.value,
    firstname: user.firstname.value,
    id: user.id.value,
    lastname: user.lastname.value,
    nickname: user.nickname.value,
    phone: user.phone.value,
});
//# sourceMappingURL=profile.response.js.map