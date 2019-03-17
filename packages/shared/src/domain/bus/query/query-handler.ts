import { Query } from './query';

export type QueryHandler<T extends Query<any>, R> = (query: T) => Promise<R>;
