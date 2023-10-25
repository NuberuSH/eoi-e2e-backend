import crypto from "node:crypto";

export class IdGeneratorNode {
  generate() {
    return crypto.randomUUID();
  }
}
