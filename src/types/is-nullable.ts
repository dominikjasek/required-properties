/**
 * Returns type
 */
export type IsNullable<T, K> = null extends T ? K : undefined extends T ? K : never;

type aaa = IsNullable<string, "a">; // => 'a'
//   ^?
