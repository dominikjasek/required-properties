import { ArrayValues } from "./array-values";
import { AddPrefix } from "./prefix";
import { RecursiveNullableKeyOf } from "./recursive-key-of.type";
import { TerminalType } from "./terminal";

export type GenericRequiredKeys<Obj, RequiredKeys extends readonly string[], Prefix extends string = never> = {
  [K in keyof Obj]: K extends string
    ? Obj[K] extends TerminalType
      ? // it is terminal
        AddPrefix<Prefix, K> extends ArrayValues<RequiredKeys>
        ? NonNullable<Obj[K]>
        : Obj[K]
      : // it is object
      AddPrefix<Prefix, K> extends ArrayValues<RequiredKeys>
      ? GenericRequiredKeys<NonNullable<Obj[K]>, RequiredKeys, `${AddPrefix<Prefix, K>}.`> extends Obj[K]
        ? GenericRequiredKeys<NonNullable<Obj[K]>, RequiredKeys, `${AddPrefix<Prefix, K>}.`>
        : never
      : GenericRequiredKeys<Obj[K], RequiredKeys, `${AddPrefix<Prefix, K>}.`> extends Obj[K]
      ? GenericRequiredKeys<Obj[K], RequiredKeys, `${AddPrefix<Prefix, K>}.`>
      : never
    : never;
};

export type RequiredKeys<T, Keys extends readonly RecursiveNullableKeyOf<T>[]> = GenericRequiredKeys<T, Keys>;

// ------------------------
interface Person {
  name: string | null;
  age: number | null;
  address: {
    city: string | null;
    country: string;
  };
}

type T1 = RequiredKeys<Person, ["name", "address.city"]>;

const person: T1 = {
  age: 3,
  name: "S",
  address: {
    city: "null",
    country: "S",
  },
};
