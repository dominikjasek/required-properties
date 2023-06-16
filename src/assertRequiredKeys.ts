import { RecursiveNullableKeyOf } from "./types/recursive-key-of.type";
import { RequiredKeys, WithRequiredKeys } from "./types/with-required-keys";
import { F } from "ts-toolbelt";

export function assertRequiredKeys<T, const TKeys extends readonly RecursiveNullableKeyOf<T>[]>(
  obj: T,
  requiredKeys: TKeys
): asserts obj is RequiredKeys<T, TKeys> {
  // for (const property of requiredKeys) {
  //   const paths = (property as string).split(".");
  //   // go through the path and check if the property exists
  //   let currentObj = obj;
  //   for (const path of paths) {
  //     if (currentObj[path] === null || currentObj[path] === undefined) {
  //       throw new Error(`Field ${property.toString()} is null or undefined`);
  //     }
  //     currentObj = currentObj[path];
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
  optionalLivingDetails?: {
    propertyType: "house" | "apartment";
  };
}

const person: Person = {
  name: "aaa",
  age: 3,
  address: {
    city: "aaa",
    country: "aaa",
  },
  optionalLivingDetails: {
    propertyType: "house",
  },
};

person.age;
//      ^?
person.address.city;
//              ^?

assertRequiredKeys(person, ["address.city"]);
//       ^? 

person.age;
//      ^?
person.address.city;
//                ^?
