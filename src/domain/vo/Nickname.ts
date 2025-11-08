export class Nickname {
  private readonly value: string;

  constructor(nickname: string) {
    if (nickname.length < 3) throw new Error("Nickname muito curto");
    this.value = nickname;
  }

  toString() {
    return this.value;
  }
}
