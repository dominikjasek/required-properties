export type IsNullable<T, K> = null extends T ? K : undefined extends T ? K : never;
export type NullableKeys<T> = { [K in keyof T]-?: IsNullable<T[K], K> }[keyof T];
