import { PasswordHasher } from "../ports/PasswordHasher";
import crypto from "crypto";

export class PasswordHasherImpl implements PasswordHasher {
  hash(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
  }
}
