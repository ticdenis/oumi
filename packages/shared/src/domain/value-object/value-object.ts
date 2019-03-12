export interface ValueObject<T> {
  equalsTo: (other: ValueObject<T>) => boolean;
  value: T;
}
