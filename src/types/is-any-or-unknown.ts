/**
 * Check if a type is `any` or `unknown`.
 */
export type IsAnyOrUnknown<T> = unknown extends T ? true : false;
