import { ValueObject } from '../core';
export declare type CurrencyVO = ValueObject<Readonly<{
    code: string;
    symbol: string;
}>>;
export declare const currencyVO: (value: {
    code: string;
    symbol: string;
}) => ValueObject<Readonly<{
    code: string;
    symbol: string;
}>>;
export declare const currencyFromCodeVO: (value: string) => ValueObject<Readonly<{
    code: string;
    symbol: string;
}>>;
//# sourceMappingURL=currency.props.d.ts.map