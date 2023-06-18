# `required-properties`

Validates required properties in a given object with full TypeScript support 🚀

## Motivation

```ts
interface Person {
    firstName: string | null;
    lastName: string;
}

const person: Person = {
    firstName: "John",
    lastName: "Doe",
}

// in some function, we require firstName to be a string
function printFullName(names: { firstName: string; lastName: string }) {
    console.log(`${names.firstName} ${names.lastName}`);
}

// business logic of our app ensures that firstName is required in this specific usecase, therefore we can do:
if (person.firstName === null) {
    throw new Error("firstName is required");
}

printFullName(person); // ❌ this results in TS error, because person is still of type Person (although typescript knows that person.firstName is string)

// we can use assertRequiredProperties to make sure that firstName is not null
assertRequiredProperties(person, ["firstName"]);
printFullName(person); // ✅ this is now valid TS code

```

## Installation

```bash
npm i required-properties
```

## Usage

### `assertRequiredProperties`

First argument is object, second argument is an array of properties which can be `null` or `undefined`. If nested
object, you can separate properties with dot `.`

```ts
interface Person {
    firstName: string | null;
    lastName: string;
    address: {
        street: string;
        city: string | null | undefined;
    }
}

const person: Person = {
    firstName: "John",
    lastName: "Doe",
    address: {
        street: "123 Main St",
        city: "New York",
    }
}

assertRequiredProperties(person, ["firstName", "address.city"]);

person; //person has now type firstName: string and address.city: string 
```

It comes with full TypeScript support:
![typescript intellisense required properties](https://gcdnb.pbrd.co/images/Gwv3WzyumIHf.png?o=1)
