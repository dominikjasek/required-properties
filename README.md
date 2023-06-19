# `required-properties`

Validates required properties in a given object with full TypeScript support 🚀

## Motivation

We have an interface with nullable property

```ts
interface Person {
    firstName: string | null;
    lastName: string;
}

const person: Person = {
    firstName: "John",
    lastName: "Doe",
}
```

We define a function which accepts subset of `Person` with nonullable properties

```ts
function printFullName(names: { firstName: string; lastName: string }) {
    console.log(`${names.firstName} ${names.lastName}`);
}
```

Somewhere in our app, we know for sure that `firstName` is not null, therefore we can do:

```ts
if (person.firstName === null) {
    throw new Error("firstName is required");
}

printFullName(person); // ❌ this results in TS error, because person is still of type Person which has nullable property firstName
```

Instead of that, you can use `assertRequiredProperties`, which handles assertion and throws error if `firstName` is
nullable 👍

```ts
assertRequiredProperties(person, ["firstName"]);
printFullName(person); // ✅ this is now valid TS code
```

## Installation

```bash
npm i required-properties
```

## Usage

### `assertRequiredProperties`

- first parameter is object you want to validate
- second argument is an array of properties which can be `null` or `undefined`. You can access nested properties using
  dot separator

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
