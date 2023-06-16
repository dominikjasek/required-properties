import { ArrayValues } from "./array-values";
import { KeyOf } from "./key-of";
import { Prefix } from "./prefix";
import { RecursiveKeyOf } from "./recursive-key-of.type";
import { TerminalType } from "./terminal";

export type WithRequiredKeys<Obj, RequiredKeys extends string[], PrefixKey extends string = never> = {
  [K in KeyOf<Obj>]: Obj[K] extends TerminalType
    ? // it is terminal
      Prefix<PrefixKey, K> extends ArrayValues<RequiredKeys>
      ? NonNullable<Obj[K]>
      : Obj[K]
    : // it is object
    Prefix<PrefixKey, K> extends ArrayValues<RequiredKeys>
    ? WithRequiredKeys<NonNullable<Obj[K]>, RequiredKeys, `${Prefix<PrefixKey, K>}.`>
    : WithRequiredKeys<Obj[K], RequiredKeys, `${Prefix<PrefixKey, K>}.`>;
};

// export type WithRequiredKeys<T, RequiredKeys extends RecursiveKeyOf<T>[]> = InnerRequiredKeys<T, RequiredKeys, never>;
// export type WithRequiredKeys<T, RequiredKeys extends RecursiveKeyOf<T>[]> = { [P in keyof T]: NonNullable<T[P]> }

// ------------------------
interface Person {
  name: string | null;
  age: number | null;
  address: {
    city: string | null;
    country: string;
  };
}

type T1 = WithRequiredKeys<
  //  ^?
  Person,
  ["name", "address.city"]
>;

const person: T1 = {
  age: 3,
  name: "S",
  address: {
    city: null,
    country: "S",
  },
};
