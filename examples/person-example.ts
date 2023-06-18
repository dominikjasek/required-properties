import { assertRequiredProperties } from "../src";

interface Person {
  firstName: string | null;
  lastName: string;
}

// we require firstName to be a string
const printFullName = (names: { firstName: string; lastName: string }) => {
  console.log(`${names.firstName} ${names.lastName}`);
};

const person: Person = {
  firstName: "John",
  lastName: "Doe",
};

// business logic of our app is that firstName is required, therefore we can do:
if (person.firstName !== null) {
  throw new Error("firstName is required");
}

// @ts-expect-error Type 'string | null' is not assignable to type 'string'.
printFullName(person); // ❌ this results in TS error, because person is still of type Person

// we can use assertRequiredProperties to make sure that fistName is not null
assertRequiredProperties(person, ["firstName"]);
printFullName(person); // ✅ this is now valid TS code
