enum Currencys {
    "usd" = "USD",
    "eur" = "EUR",
    "brl" = "BRL"
}

export class Currency {
    private readonly value: string;

    constructor(currency: string) {
        if (!this.validate(currency)) throw new Error("Moeda inválido");
        this.value = currency.toLocaleUpperCase();
    }

    private validate(currency: string): boolean {
        return Object.values(Currencys).includes(currency.toLocaleUpperCase() as Currencys);
    }

    toString() {
        return this.value;
    }
}
