export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
export type NonOptionalKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>;
export type OptionalKeys<T> = Exclude<keyof T, NonOptionalKeys<T>>;

type Example = {
  a: string;
  b?: string;
};

type All = KeysOfType<Example, any>;
type A = OptionalKeys<Example>; // => 'b'
type B = NonOptionalKeys<Example>;
