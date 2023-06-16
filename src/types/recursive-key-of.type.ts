import { IsAnyOrUnknown } from "./is-any-or-unknown";
import { IsNever } from "./is-never";
import { KeyOf } from "./key-of";
import { IsNullable } from "./nullable-keys";
import { AddPrefix } from "./prefix";
import { TerminalType } from "./terminal";

export type RecursiveNullableKeyOf<T, Prefix extends string = never> = T extends TerminalType
  ? never
  : IsAnyOrUnknown<T> extends true
  ? never
  : {
      [K in KeyOf<T>]:
        | RecursiveNullableKeyOf<T[K], `${AddPrefix<Prefix, K>}.`>
        | IsNullable<T[K], AddPrefix<Prefix, K>>;
    }[KeyOf<T>]; 

type t = RecursiveNullableKeyOf<{ a: { b1: { c: string | null }, b2: number | null } }>; // => 'a' | 'a.b' | 'a.b.c'
//   ^?
