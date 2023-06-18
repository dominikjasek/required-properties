# `ts-required-properties`

Validates required properties in a given object with full TypeScript support 🚀

## Motivation

```ts
interface Person {
    firstName: string | null;
    lastName: string;
}

// we require firstName to be a string
const printFullName = (names: { firstName: string; lastName: string }) => {
    console.log(`${names.firstName} ${names.lastName}`);
}

const person: Person = {
    firstName: "John",
    lastName: "Doe",
}

// business logic of our app is that firstName is required, therefore we can do:
if (person.firstName !== null) {
    throw new Error("firstName is required");
}

printFullName(person); // ❌ this results in TS error, because person is still of type Person

// we can use assertRequiredProperties to make sure that fistName is not null
assertRequiredProperties(person, ["firstName"]);
printFullName(person); // ✅ this is now valid TS code

```

Code example can be found [here](./example/person-example.ts)

## Installation

```bash
npm i ts-required-properties
```

## Usage

### `assertRequiredProperties`

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
