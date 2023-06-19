import { ArrayValues } from "./array-values";
import { MergeStrings } from "./merge-strings";
import { RecursiveNullableKeyOf } from "./recursive-nullable-key-of";

/**
 * Returns all recursive keys of an object that are nullable, required keys are generic `string[]` to allow recursion
 */
type WithGenericRequiredKeys<Obj, RequiredKeys extends readonly string[], Prefix extends string = never> = {
  [K in keyof Obj]: K extends string
    ? Obj[K] extends object
      ? // it is object
        MergeStrings<Prefix, K> extends ArrayValues<RequiredKeys>
        ? // it is required key
          WithGenericRequiredKeys<NonNullable<Obj[K]>, RequiredKeys, `${MergeStrings<Prefix, K>}.`> extends Obj[K]
          ? WithGenericRequiredKeys<NonNullable<Obj[K]>, RequiredKeys, `${MergeStrings<Prefix, K>}.`>
          : never
        : // it is not required key
        WithGenericRequiredKeys<Obj[K], RequiredKeys, `${MergeStrings<Prefix, K>}.`> extends Obj[K]
        ? WithGenericRequiredKeys<Obj[K], RequiredKeys, `${MergeStrings<Prefix, K>}.`>
        : never
      : // it is terminal type
      MergeStrings<Prefix, K> extends ArrayValues<RequiredKeys>
      ? // it is required key
        NonNullable<Obj[K]>
      : // // it is not required key
        Obj[K]
    : never;
};

/**
 * Returns all recursive keys of an object that are nullable, required keys are constrained to RecursiveNullableKeyOf<T> for typescript intellisense
 * @example type T = WithRequiredKeys<{ a: { b: string| null }}, ["a.b"]> // => { a: { b: string } };
 */
export type WithRequiredKeys<
  T extends object,
  Keys extends readonly RecursiveNullableKeyOf<T>[]
> = WithGenericRequiredKeys<T, Keys>;
