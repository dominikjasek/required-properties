import { ArrayValues } from "./array-values";
import { AddPrefix } from "./prefix";
import { RecursiveNullableKeyOf } from "./recursive-key-of.type";
import { TerminalType } from "./terminal";

export type WithRequiredKeys<Obj, RequiredKeys extends string[], Prefix extends string = never> = {
  [K in keyof Obj]: K extends string
    ? Obj[K] extends TerminalType
      ? // it is terminal
        AddPrefix<Prefix, K> extends ArrayValues<RequiredKeys>
        ? NonNullable<Obj[K]>
        : Obj[K]
      : // it is object
      AddPrefix<Prefix, K> extends ArrayValues<RequiredKeys>
      ? WithRequiredKeys<NonNullable<Obj[K]>, RequiredKeys, `${AddPrefix<Prefix, K>}.`> extends Obj[K]
        ? WithRequiredKeys<NonNullable<Obj[K]>, RequiredKeys, `${AddPrefix<Prefix, K>}.`>
        : never
      : WithRequiredKeys<Obj[K], RequiredKeys, `${AddPrefix<Prefix, K>}.`> extends Obj[K]
      ? WithRequiredKeys<Obj[K], RequiredKeys, `${AddPrefix<Prefix, K>}.`>
      : never
    : never;
};

export type RequiredKeys<T, RequiredKeys extends RecursiveNullableKeyOf<T>[]> = WithRequiredKeys<T, RequiredKeys>;

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
    city: null,
    country: "S",
  },
};
