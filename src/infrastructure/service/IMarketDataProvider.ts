import yahooFinance from "yahoo-finance2";
import axios from "axios";

export default interface IMarketDataProvider {
    getValueAction(symbol: string): Promise<any>
}

export class YahooFinanceService implements IMarketDataProvider {
    public async getValueAction(symbol: string) {
        const maxAttempts = 5;
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                const quote = await yahooFinance.quote(symbol);
                return {
                    symbol,
                    price: quote.regularMarketPrice,
                    currency: quote.currency,
                };
            } catch (e) {
                attempts++;
                console.log(`Tentativa ${attempts} falhou para ${symbol}. Tentando novamente...`);
                await new Promise(res => setTimeout(res, 1000));
            }
        }
        console.log(`❌ Não foi possível obter a cotação de ${symbol} após ${maxAttempts} tentativas.`);
        return {
            symbol,
            price: 0,
            currency: "N/A",
        };
    }
}

export class FinnhubService implements IMarketDataProvider {
    private readonly apiKey = process.env.FINNHUB_API_KEY || "d18q9s9r01qt6geqrn1gd18q9s9r01qt6geqrn20";

    private urlAction(value: string): string {
        return `https://finnhub.io/api/v1/quote?symbol=${value}&token=${this.apiKey}`;
    }

    private urlCurrency(): string {
        return `https://finnhub.io/api/v1/forex/rates`;
    }

    public async getValueAction(symbol: string) {
        const { data } = await axios.get(this.urlAction(symbol));
        return {
            symbol,
            price: data.c,
            currency: "USD",
        };
    }

    public async getValueCurrency(symbol: string) {
        const apiKey = process.env.FINNHUB_API_KEY;
        if (!apiKey) throw new Error('FINNHUB_API_KEY não configurada');

        const response = await axios.get(
            this.urlCurrency(),
            {
                params: {
                    base: 'BRL',
                    token: apiKey
                }
            }
        );

        const data = response.data;
        if (!data || !data.rates || typeof data.rates.USD !== 'number') {
            throw new Error('Resposta inesperada da Finnhub');
        }

        return data.rates.USD;
    }
}
