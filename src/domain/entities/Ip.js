import { InvalidIpError } from "../errors/InvalidIpError.js";

export class Ip {
  static separator = ".";
  static numberOfDigits = 4;

  static fromString(ip) {
    this.ensureIsValid(ip);
    return new Ip(ip);
  }

  static ensureIsValid(ip) {
    const digits = this.parseDigits(ip);

    if (digits.length !== this.numberOfDigits) {
      throw new InvalidIpError(ip);
    }

    const anyInvalidDigit = digits.some(this.isInvalid);

    if (anyInvalidDigit) {
      throw new InvalidIpError(ip);
    }
  }

  static parseDigits(ip) {
    return ip.split(this.separator).map((el) => parseInt(el));
  }

  static isInvalid(digit) {
    return isNaN(digit) || digit > 255 || digit < 0;
  }

  constructor(value) {
    this.value = value;
  }

  isLocal() {
    return this.isLocalhost() || this.isLocalDocker();
  }

  isLocalDocker() {
    return this.value.startsWith("172");
  }

  isLocalhost() {
    return this.value === "127.0.0.1";
  }
}
