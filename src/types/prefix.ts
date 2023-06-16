import { IsNever } from "./is-never";

export type Prefix<
  Prefix extends string = never,
  Base extends string = ""
> = IsNever<Prefix> extends true ? `${Base}` : `${Prefix}${Base}`;
