export class Email {
    private readonly value: string;

    constructor(email: string) {
        if (!this.validate(email)) throw new Error("Email inválido");
        this.value = email;
    }

    private validate(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    toString() {
        return this.value;
    }
}
