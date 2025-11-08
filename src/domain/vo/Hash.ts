import { PasswordHasher } from "../ports/PasswordHasher";

export class Hash {
  private readonly value: string;

  constructor(hash: string) {
    this.value = hash;
  }

  static createFromPassword(password: string, hasher: PasswordHasher): Hash {
    const hash = hasher.hash(password);
    return new Hash(hash);
  }

  toString() {
    return this.value;
  }
}
