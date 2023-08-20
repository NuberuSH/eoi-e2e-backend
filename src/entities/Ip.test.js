import { describe, it, expect } from "vitest";
import { Ip } from "./Ip.js";
import { InvalidIpError } from "../errors/InvalidIpError.js";

describe("Ip", () => {
  it("parses a well-formed ip", () => {
    const raw = "192.168.1.1";

    const ip = Ip.fromString(raw);

    expect(ip.value).toEqual(raw);
  });

  it("fails with an empty string", () => {
    const raw = "";

    const fn = () => Ip.fromString(raw);

    expect(fn).toThrowError(new InvalidIpError(raw));
  });

  it("fails if not separated by 4 dots", () => {
    const raw = "123.123.123";

    const fn = () => Ip.fromString(raw);

    expect(fn).toThrowError(new InvalidIpError(raw));
  });

  it("fails if first number is over 255", () => {
    const raw = "256.1.1.1";

    const fn = () => Ip.fromString(raw);

    expect(fn).toThrowError(new InvalidIpError(raw));
  });

  it("fails if any number is over 255", () => {
    const raw = "1.1.1.256";

    const fn = () => Ip.fromString(raw);

    expect(fn).toThrowError(new InvalidIpError(raw));
  });

  it("fails if any number is below 0", () => {
    const raw = "1.1.1.-1";

    const fn = () => Ip.fromString(raw);

    expect(fn).toThrowError(new InvalidIpError(raw));
  });

  it("fails if used with letters", () => {
    const raw = "a.b.c.d";

    const fn = () => Ip.fromString(raw);

    expect(fn).toThrowError(new InvalidIpError(raw));
  });
});
