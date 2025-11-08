import { CurrencyService } from "../../../infrastructure/service/CurrencyService";
import WalletRepository from "../../repositories/WalletRepository";
import UseCase from "../UseCase";

export class GetUseCase implements UseCase {
    constructor(
        private walletRepository: WalletRepository,
        private currencyService: CurrencyService
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { id, type } = input;
        const wallets = await this.walletRepository.findByIdUser(id);
        if (!wallets) return { wallets: [] }
        const walletsValue: any[] = [];
        for (const wallet of wallets) {
            const currencyValue = await this.currencyService.get(wallet.currency.toString());
            walletsValue.push({
                id: wallet.id,
                name: wallet.name.toString(),
                currency: wallet.currency.toString(),
                value: currencyValue.value
            });
        }
        return { wallets: walletsValue };
    }
}

type Input = {
    id: string,
    nickname: string
    type: "a" | "i"
}   

type Output = {
    wallets: any,
};