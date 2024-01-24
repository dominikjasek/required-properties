# `required-properties`

Validates required properties in a given object with full TypeScript support 🚀

## Installation

```bash
npm i required-properties
```

## Motivation

When we know that some property in object is not null or undefined, we can check for it. But TypeScript is not able to
infer the type
of original object. 😱

### Usecase #1

```ts
interface Data {
    value: string | null;
}

declare function mockDbQuery(): Data

const getNonNullableData = () => {
    const dbResult = mockDbQuery()

    // by some business logic, we know that value is not null
    if (dbResult.value === null) {
        throw new Error("value is null!")
    }

    return dbResult
}

const data = getNonNullableData()
data.value // -> string | null ❌ (expected only string)
```

TS playground: [link](https://tsplay.dev/w2kqzN)

### Usecase #2

```ts
interface Person {
    firstName: string | null;
    lastName: string;
}

const person: Person = {
    firstName: "John",
    lastName: "Doe",
};

function printFullName(names: { firstName: string; lastName: string }) {
    console.log(`${names.firstName} ${names.lastName}`);
}

// original approach
if (person.firstName === null) {
    throw new Error("firstName is required");
}

printFullName(person); // ❌ this results in TS error, because person is still of type Person which has nullable property firstName
```

TS playground: [link](https://tsplay.dev/m3vY1N)

## Usage

### `assertRequiredProperties`

- first parameter is object you want to validate
- second argument is an array of properties which can be `null` or `undefined`. You can access nested properties using
  dot separator

### Solution for Usecase #1

```ts
import {assertRequiredProperties} from "required-properties";

interface Data {
    value: string | null;
}

declare function mockDbQuery(): Data

const getNonNullableData = () => {
    const dbResult = mockDbQuery()

    assertRequiredProperties(dbResult, ["value"]) // 👈 this changes type of dbResult

    return dbResult
}

const data = getNonNullableData()
data.value // -> string ✅
```

### Solution for Usecase #2

```ts
import {assertRequiredProperties} from "required-properties";

interface Person {
    firstName: string | null;
    lastName: string;
}

const person: Person = {
    firstName: "John",
    lastName: "Doe",
};

function printFullName(names: { firstName: string; lastName: string }) {
    console.log(`${names.firstName} ${names.lastName}`);
}

// assertRequiredProperties approach
assertRequiredProperties(person, ["firstName"]); // 👈 this changes type of person
printFullName(person); // ✅ this is now valid TS code
```

It comes with full TypeScript support (also for nested nullable properties):
<img width="800" alt="image" src="https://github.com/dominikjasek/required-properties/assets/48070343/7987f677-60ab-413d-b1a9-a06f7f2185d1">

