"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oumi-package/core");
const user_events_1 = require("./user.events");
class User extends core_1.AggregateRoot {
    static create(args) {
        const user = new this(args);
        user.recordDomainEvent(user_events_1.userRegistered({
            email: user._email.value,
            firstname: user._firstname.value,
            id: user._id.value,
            lastname: user._lastname.value,
            nickname: user._nickname.value,
            phone: user._phone.value,
        }));
        return user;
    }
    constructor(args) {
        super();
        this._email = args.email;
        this._firstname = args.firstname;
        this._id = args.id;
        this._lastname = args.lastname;
        this._nickname = args.nickname;
        this._password = args.password;
        this._phone = args.phone;
    }
    updateProfile({ firstname, lastname, nickname, phone }) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._nickname = nickname;
        this._phone = phone;
        this.recordDomainEvent(user_events_1.profileUpdated({
            firstname: this._firstname.value,
            id: this._id.value,
            lastname: this._lastname.value,
            nickname: this._nickname.value,
            phone: this._phone.value
        }));
    }
    get email() {
        return this._email;
    }
    get id() {
        return this._id;
    }
    get firstname() {
        return this._firstname;
    }
    get lastname() {
        return this._lastname;
    }
    get nickname() {
        return this._nickname;
    }
    get password() {
        return this._password;
    }
    get phone() {
        return this._phone;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map