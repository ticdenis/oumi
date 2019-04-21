"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("io-ts"));
const io_ts_types_1 = require("io-ts-types");
const date_1 = require("io-ts-types/lib/Date/date");
const uuid_1 = require("io-ts-types/lib/string/uuid");
const uuid_2 = require("uuid");
const _1 = require("./");
exports.simpleValueObject = value => ({
    equalsTo: other => other.value === value,
    value,
});
function isFloat(n) {
    return Number.isInteger(n) || (n === 0 || (Number(n) === n && n % 1 !== 0));
}
exports.stringVO = (value) => {
    if (t.string.decode(value).isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_STRING', value);
    }
    return exports.simpleValueObject(value);
};
exports.nullableStringVO = (value = null) => {
    if (io_ts_types_1.fromNullable(t.string)('')
        .decode(value)
        .isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_NULLABLE_STRING', value);
    }
    return exports.simpleValueObject(value);
};
exports.uuidVO = (value) => {
    const _value = value || uuid_2.v4();
    if (uuid_1.uuid.decode(_value).isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_UUID', value);
    }
    return exports.simpleValueObject(_value);
};
exports.numberVO = (value) => {
    if (t.number.decode(value).isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_NUMBER', value);
    }
    return exports.simpleValueObject(value);
};
exports.nullableNumberVO = (value = null) => {
    if (io_ts_types_1.fromNullable(t.number)(0)
        .decode(value)
        .isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_NULLABLE_NUMBER', value);
    }
    return exports.simpleValueObject(value);
};
exports.intVO = (value) => {
    if (t.Int.decode(value).isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_INT', value);
    }
    return exports.simpleValueObject(value);
};
exports.nullableIntVO = (value = null) => {
    if (io_ts_types_1.fromNullable(t.Integer)(0)
        .decode(value)
        .isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_NULLABLE_INT', value);
    }
    return exports.simpleValueObject(value);
};
exports.floatVO = (value) => {
    if (!isFloat(value)) {
        throw new _1.ValueObjectDomainError('INVALID_INT', value);
    }
    return exports.simpleValueObject(value);
};
exports.nullableFloatVO = (value = null) => {
    if (value !== null && !isFloat(value)) {
        throw new _1.ValueObjectDomainError('INVALID_NULLABLE_FLOAT', value);
    }
    return exports.simpleValueObject(value);
};
exports.dateVO = (value) => {
    if (date_1.date.decode(value).isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_DATE', value);
    }
    return exports.simpleValueObject(value);
};
exports.nullableDateVO = (value = null) => {
    if (io_ts_types_1.fromNullable(date_1.date)(new Date())
        .decode(value)
        .isLeft()) {
        throw new _1.ValueObjectDomainError('INVALID_NULLABLE_DATE', value);
    }
    return exports.simpleValueObject(value);
};
exports.intervalDateVO = (value) => {
    if (value.end.getMilliseconds() < value.start.getMilliseconds()) {
        throw new _1.ValueObjectDomainError('INVALID_INTERVAL_DATE', value);
    }
    return exports.simpleValueObject(value);
};
//# sourceMappingURL=value-object.js.map