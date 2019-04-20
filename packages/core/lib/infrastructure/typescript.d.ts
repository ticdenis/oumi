export declare type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
export declare const then: <T, Ret>(f: (t: T) => Ret | PromiseLike<Ret>) => (promise: Promise<T>) => Promise<Ret>;
//# sourceMappingURL=typescript.d.ts.map