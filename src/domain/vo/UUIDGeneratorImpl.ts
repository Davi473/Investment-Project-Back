import { UUIDGenerator } from "../ports/UUIDGenerator";
import crypto from "crypto";

export class UUIDGeneratorImpl implements UUIDGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
