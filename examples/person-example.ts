import { assertRequiredProperties } from "../src";

interface Person {
  firstName: string | null;
  lastName: string;
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
  firstName: "John",
  lastName: "Doe",
  age: null,
  address: {
    city: "New York",
    country: "USA",
  },
  optionalLivingDetails: {
    propertyType: "house",
  },
};

// in some function, we require firstName to be a string
function printFullName(names: { firstName: string; lastName: string }) {
  console.log(`${names.firstName} ${names.lastName}`);
}

// business logic of our app ensures that firstName is required in this specific usecase, therefore we can do:
if (person.firstName === null) {
  throw new Error("firstName is required");
}

// @ts-expect-error Type 'string | null' is not assignable to type 'string'.
printFullName(person); // ❌ this results in TS error, because person is still of type Person (although typescript knows that person.firstName is string)

// we can use assertRequiredProperties to make sure that firstName is not null
assertRequiredProperties(person, ["firstName", "address.city", "optionalLivingDetails"]);
printFullName(person); // ✅ this is now valid TS code

person.firstName; // -> string
//      ^?
person.age; // -> number | null
//      ^?
person.address.city; // -> string
//              ^?

person.optionalLivingDetails.propertyType; // -> { propertyType: "house" | "apartment" }
//                       ^?
