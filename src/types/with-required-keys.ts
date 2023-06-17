import { ArrayValues } from "./array-values";
import { MergeStrings } from "./merge-strings";
import { RecursiveNullableKeyOf } from "./recursive-nullable-key-of";

/**
 * Returns all recursive keys of an object that are nullable, required keys are generic `string[]` to allow recursion
 */
export type WithGenericRequiredKeys<Obj, RequiredKeys extends readonly string[], Prefix extends string = never> = {
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
 */
export type WithRequiredKeys<T extends object, Keys extends readonly RecursiveNullableKeyOf<T>[]> = WithGenericRequiredKeys<T, Keys>;

// ------------------------
interface Person {
  name: string | null;
  age: number | null;
  address: {
    city: string | null;
    country: string;
  };
}

type T1 = WithRequiredKeys<Person, ["name"]>;

const person: T1 = {
  age: 3,
  name: "S",
  address: {
    city: "null",
    country: "S",
  },
};

type A = {
  a: string;
  b?: string;
};

type B = { [K in keyof A]: Required<A[K]> };

const b: B = {
  a: "a",
  b: "b",
};
