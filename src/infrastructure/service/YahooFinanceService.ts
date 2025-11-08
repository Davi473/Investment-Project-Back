import yahooFinance from "yahoo-finance2";

export class YahooFinanceService {
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
