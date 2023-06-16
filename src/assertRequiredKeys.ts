import { RecursiveKeyOf } from "./types/recursive-key-of.type";
import { WithRequiredKeys } from "./types/with-required-keys";

export function assertRequiredKeys<T, TKeys extends RecursiveKeyOf<T>[]>(
  obj: T,
  requiredKeys: TKeys
): WithRequiredKeys<T, TKeys> {
  // for (const property of requiredKeys) {
  //   if (obj[property] === null || obj[property] === undefined) {
  //     throw new Error(`Field ${property.toString()} is null or undefined`);
  //   }
  // }
  return null as any;
}

interface Person {
  name: string | null;
  age: number | null;
  address: {
    city: string | null;
    country: string;
  };
}

const person: Person = {
  name: "aaa",
  age: 3,
  address: {
    city: "aaa",
    country: "aaa",
  },
};

person.age;
//      ^?
person.address.city;
//              ^?

const newPerson = assertRequiredKeys(person, ["age", "address.city"]);

newPerson.age;
//      ^?
newPerson.address.city;
//                 ^?

function isComplete<T extends {}>(o: T): asserts o is { [P in keyof T]: NonNullable<T[P]> } {}
