/**
 * Returns type K if T is nullable, otherwise returns never
 */
export type IsNullable<T, K> = null extends T ? K : undefined extends T ? K : never;
