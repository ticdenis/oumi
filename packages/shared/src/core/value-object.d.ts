export interface ValueObject<T> {
    readonly equalsTo: (other: ValueObject<T>) => boolean;
    readonly value: T;
}
export declare type StringVO = ValueObject<string>;
export declare type NullableStringVO = ValueObject<string | null>;
export declare type Uuid = string;
export declare type UuidVO = ValueObject<Uuid>;
export declare type NumberVO = ValueObject<number>;
export declare type NullableNumberVO = ValueObject<number | null>;
export declare type IntVO = NumberVO;
export declare type NullableIntVO = NullableNumberVO;
export declare type FloatVO = NumberVO;
export declare type NullableFloatVO = NullableNumberVO;
export declare type DateVO = ValueObject<Date>;
export declare type IntervalDateVO = ValueObject<{
    end: Date;
    start: Date;
}>;
export declare type NullableDateVO = ValueObject<Date | null>;
export declare const simpleValueObject: <T>(value: T) => ValueObject<T>;
export declare const stringVO: (value: string) => ValueObject<string>;
export declare const nullableStringVO: (value?: string) => ValueObject<string>;
export declare const uuidVO: (value?: string) => ValueObject<string>;
export declare const numberVO: (value: number) => ValueObject<number>;
export declare const nullableNumberVO: (value?: number) => ValueObject<number>;
export declare const intVO: (value: number) => ValueObject<number>;
export declare const nullableIntVO: (value?: number) => ValueObject<number>;
export declare const floatVO: (value: number) => ValueObject<number>;
export declare const nullableFloatVO: (value?: number) => ValueObject<number>;
export declare const dateVO: (value: Date) => ValueObject<Date>;
export declare const nullableDateVO: (value?: Date) => ValueObject<Date>;
export declare const intervalDateVO: (value: {
    end: Date;
    start: Date;
}) => ValueObject<{
    end: Date;
    start: Date;
}>;
//# sourceMappingURL=value-object.d.ts.map