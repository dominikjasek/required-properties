import { IsAnyOrUnknown } from "./is-any-or-unknown";
import { IsNever } from "./is-never";
import { KeyOf } from "./key-of";
import { TerminalType } from "./terminal";

/**
 * Deep nested keys of an interface with dot syntax
 *
 * @example
 * type t = RecursiveKeyOf<{a: {b: {c: string}}}> // => 'a' | 'a.b' | 'a.b.c'
 */
export type RecursiveKeyOf<T, Prefix extends string = never> = T extends TerminalType
  ? never
  : IsAnyOrUnknown<T> extends true
  ? never
  : {
      [K in KeyOf<T>]: IsNever<Prefix> extends true
        ? K | RecursiveKeyOf<T[K], K>
        : `${Prefix}.${K}` | RecursiveKeyOf<T[K], `${Prefix}.${K}`>;
      // };
    }[KeyOf<T>];

/**
 * Get the type of a nested property with dot syntax
 *
 * Basically the inverse of `RecursiveKeyOf`
 *
 * @example
 * type t = DeepPropertyType<{a: {b: {c: string}}}, 'a.b.c'> // => string
 */
export type DeepPropertyType<
  T,
  P extends RecursiveKeyOf<T>,
  TT = Exclude<T, undefined>
> = P extends `${infer Prefix}.${infer Rest}`
  ? Prefix extends keyof TT
    ? Rest extends RecursiveKeyOf<TT[Prefix]>
      ? DeepPropertyType<TT[Prefix], Rest>
      : never
    : never
  : P extends keyof TT
  ? TT[P]
  : never;

type t = DeepPropertyType<{ a: { b: { c: string } } }, "a.b.c">;
//   ^?
