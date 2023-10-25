export class InvalidIpError extends Error {
  constructor(ip) {
    super(`Invalid IP address ${ip}`);
  }
}
