import { RecursiveNullableKeyOf } from "./types/recursive-nullable-key-of";
import { WithRequiredKeys } from "./types/with-required-keys";

export function assertRequiredKeys<T, const TKeys extends readonly RecursiveNullableKeyOf<T>[]>(
  obj: T,
  requiredKeys: TKeys
): asserts obj is WithRequiredKeys<T, TKeys> {
  for (const property of requiredKeys) {
    const propertyParts = (property as string).split(".") as (keyof T)[];
    let currentObj: any = obj;
    for (const propertyPart of propertyParts) {
      currentObj = currentObj?.[propertyPart];
    }
    if (currentObj === undefined || currentObj === null) {
      throw new Error(`Property ${property} is required`);
    }
  }
}

interface Person {
  name: string | null;
  age: number | null;
  address: {
    city: string | null;
    country: string;
  };
  optionalLivingDetails:
    | {
        propertyType: "house" | "apartment";
      }
    | undefined;
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

assertRequiredKeys(person, ["address.city", "optionalLivingDetails"]);

person.age;
//       ^?
person.address.city;
//                ^?

person.optionalLivingDetails.propertyType;
//                       ^?
