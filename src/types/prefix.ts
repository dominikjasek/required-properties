import { IsNever } from "./is-never";

export type AddPrefix<Prefix extends string = never, Base extends string = ""> = IsNever<Prefix> extends true
  ? `${Base}`
  : `${Prefix}${Base}`;

type PPP = AddPrefix<"dsa.", "a">;
//    ^?
