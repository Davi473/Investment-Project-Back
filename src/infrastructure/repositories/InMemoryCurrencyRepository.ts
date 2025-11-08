import { CurrencyRepository } from "../../application/repositories/CurrencyRepository";

export class InMemoryCurrencyRepository implements CurrencyRepository {
    private memory: Map<string, any> = new Map();

    public async save(currency: any): Promise<void> {
        this.memory.set(currency.name, currency);
    }

    public async findById(id: string): Promise<any | null> {
        let currencyExist: any | null = null;
        this.memory.forEach(currency => {
            if (currency.id === id) currencyExist = currency;
        });
        return currencyExist;
    }

    public async findByName(name: string): Promise<any | null> {
        return this.memory.get(name) || null;
    }

    public async findAll(): Promise<any[]> {
        let currencys: any[] = [];
        this.memory.forEach(currency => {
            currencys.push(currency);
        });
        return currencys;
    }
}