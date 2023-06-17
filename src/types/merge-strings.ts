import { IsNever } from "./is-never";

/**
 * Merges two strings, first one can be of type `never`
 * @example type Example = MergeStrings<"Hello", "World"> // => "HelloWorld"
**/ 
export type MergeStrings<Prefix extends string = never, Base extends string = ""> = IsNever<Prefix> extends true
  ? `${Base}`
  : `${Prefix}${Base}`;

