export interface Mapper<E, S> {
  item: (source: S) => E;
  items: (sources: S[]) => E[];
}
