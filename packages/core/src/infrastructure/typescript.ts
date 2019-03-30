export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

export const then = <T, Ret>(f: (t: T) => Ret | PromiseLike<Ret>) => (
  promise: Promise<T>,
): Promise<Ret> => promise.then(f);
