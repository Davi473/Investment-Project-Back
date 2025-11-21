import { CurrencyRepository } from "../../application/repositories/CurrencyRepository";
import IMarketDataProvider from "./IMarketDataProvider";

export class CurrencyService {

    constructor(
        private repository: CurrencyRepository,
        private service: IMarketDataProvider
    ) {
        this.init();
        this.repeat();
        setInterval(() => {
            this.repeat();
        }, 5 * 60 * 1000);
    }

    private async init() {
        const currencys = ["USDBRL=X", "USDUSD=X", "USDEUR=X"];
        for (const currency of currencys) {
            const currencyNew = await this.service.getValueAction(currency);
            if (!currencyNew.price) continue;
            const currencyObject = {
                id: crypto.randomUUID(),
                currency,
                value: currencyNew.price,
                name: currencyNew.currency
            };
            this.repository.save(currencyObject);
        }
    }

    private async repeat() {
        const currencys = await this.repository.findAll();
        if (currencys.length === 0 ) return;
        for (const currency of currencys) {
            const currencyNew = await this.service.getValueAction(currency.currency);
            // if (!currencyNew.price) continue;
            const currencyObject = {
                id: crypto.randomUUID(),
                currency: currency.currency,
                value: currencyNew.price,
                name: currency.name
            };
            this.repository.save(currencyObject);
        }
    }

    public async get(currency: string): Promise<any>  {
        const currencyExist = await this.repository.findByName(currency);
        if (!currencyExist) 
            throw new Error(`Currency ${currency} no exist`); 
        return currencyExist;
    }
}