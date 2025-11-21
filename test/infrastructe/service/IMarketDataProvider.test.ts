import { YahooFinanceService, FinnhubService } from "../../../src/infrastructure/service/IMarketDataProvider";

test("Test de Api", async () => {
    const getAsset = new FinnhubService();
    console.log(await getAsset.getValueAction("VALE"))
});