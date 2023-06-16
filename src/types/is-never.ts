export type IsNever<T = never> = [T] extends [never] ? true : false;
