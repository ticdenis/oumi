import { ValueObject } from '../core';
export declare type AmountVO = ValueObject<Readonly<{
    amount: number;
    currency: {
        code: string;
        symbol: string;
    };
}>>;
export declare const amountVO: (value: {
    amount: number;
    currency: ValueObject<Readonly<{
        code: string;
        symbol: string;
    }>>;
}) => ValueObject<Readonly<{
    amount: number;
    currency: {
        code: string;
        symbol: string;
    };
}>>;
//# sourceMappingURL=amount.props.d.ts.map