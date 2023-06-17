import { describe, it, expect } from "vitest";
import { assertRequiredProperties } from "../src";

interface Person {
  name: string | null | undefined;
  age: number | null;
  address: {
    city: string | null | undefined;
  };
}

describe("assertRequiredKeys", () => {
  it("should not throw error when all required keys are present", () => {
    const person: Person = {
      name: "John",
      age: 18,
      address: {
        city: "Prague",
      },
    };

    expect(() => assertRequiredProperties(person, ["name", "age", "address.city"])).not.toThrow();
  });

  it("should throw error when root key is null", () => {
    const person: Person = {
      name: null,
      age: 18,
      address: {
        city: "Prague",
      },
    };

    expect(() => assertRequiredProperties(person, ["name"])).toThrow("Property name is required");
  });

  it("should throw error when root key is undefined", () => {
    const person: Person = {
      name: undefined,
      age: 18,
      address: {
        city: "Prague",
      },
    };

    expect(() => assertRequiredProperties(person, ["name", "address.city"])).toThrow("Property name is required");
  });

  it("should throw error when nested property is null", () => {
    const person: Person = {
      name: "John",
      age: 18,
      address: {
        city: null,
      },
    };

    expect(() => assertRequiredProperties(person, ["name", "address.city"])).toThrow(
      "Property address.city is required"
    );
  });

  it("should throw error when nested property is undefined", () => {
    const person: Person = {
      name: "John",
      age: 18,
      address: {
        city: undefined,
      },
    };

    expect(() => assertRequiredProperties(person, ["name", "address.city"])).toThrow(
      "Property address.city is required"
    );
  });

  it("should throw error when both root and nested property is undefined", () => {
    const person: Person = {
      name: null,
      age: 18,
      address: {
        city: undefined,
      },
    };

    expect(() => assertRequiredProperties(person, ["name", "address.city"])).toThrow("Property name is required");
  });
});
