import { IsAnyOrUnknown } from "./is-any-or-unknown";
import { IsNullable } from "./is-nullable";
import { MergeStrings } from "./merge-strings";

type StringConstrainedKeyOf<T> = keyof T & string;

/**
 * Returns all recursive keys of an object that are nullable
 * @example type Example = RecursiveNullableKeyOf<{ a: { b: { c: string | null }, d: number | null, e?: string } }> // => 'a.b.c' | 'a.d' | 'a.e'
 */
export type RecursiveNullableKeyOf<T, Prefix extends string = never> = T extends object
  ? IsAnyOrUnknown<T> extends true
    ? never
    : {
        [K in StringConstrainedKeyOf<T>]:
          | RecursiveNullableKeyOf<T[K], `${MergeStrings<Prefix, K>}.`>
          | IsNullable<T[K], MergeStrings<Prefix, K>>;
      }[StringConstrainedKeyOf<T>]
  : never;
