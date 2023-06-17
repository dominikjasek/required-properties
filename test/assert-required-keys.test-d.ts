import { describe, it, expect, assertType, expectTypeOf } from "vitest";
import { assertRequiredProperties } from "../src";

interface Person {
  name: string | null | undefined;
  age: number | null;
  address: {
    city: string | null | undefined;
  };
}

describe("assertRequiredKeys - types", () => {
  it("should make all properties required", () => {
    const person: Person = {
      name: "John",
      age: 18,
      address: {
        city: "Prague",
      },
    };

    assertRequiredProperties(person, ["name", "age", "address.city"]);

    expectTypeOf(person.name).toEqualTypeOf<string>();
    expectTypeOf(person.age).toEqualTypeOf<number>();
    expectTypeOf(person.address.city).toEqualTypeOf<string>();
  });

  it("should make only some properties required", () => {
    const person: Person = {
      name: "John",
      age: 18,
      address: {
        city: "Prague",
      },
    };

    assertRequiredProperties(person, ["name", "address.city"]);

    expectTypeOf(person.name).toEqualTypeOf<string>();
    expectTypeOf(person.age).toEqualTypeOf<number | null>();
    expectTypeOf(person.address.city).toEqualTypeOf<string>();
  });
});
