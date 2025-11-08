import UseCase from "../UseCase";
import { InvestmentRepository } from "../../repositories/InvestmentRepository";
import { Investment } from "../../../domain/entity/Investment";
import { ActionService } from "../../../infrastructure/service/ActionService";
import { CurrencyService } from "../../../infrastructure/service/CurrencyService";

export class GetUseCase implements UseCase 
{
    constructor(
        private repository: InvestmentRepository,
        private actionService: ActionService,
        private currencyService: CurrencyService
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idWallet } = input;
        const investments: Investment[] | null = await this.repository.findByIdWallet(idWallet);
        if (!investments) return { investments: [] }
        const investmentValue: any[] = [];
        for (const investment of investments) {
            const value = await this.actionService.get(investment.name.toString());
            const currencyValueInvestment = await this.currencyService.get(investment.currency);
            investmentValue.push({
                id: investment.id,
                date: investment.created.toString(),
                nickname: investment.name.toString(),
                quantity: investment.quantity,
                average: investment.average,
                currency: investment.currency,
                category: investment.category,
                currentValue: value.amount,
                userCurrency: currencyValueInvestment.value,
                type: investment.buy ? "Buy" : "Sell"
            });
        }
        return { investments: investmentValue };
    }
}

type Input = {
    idWallet: string,
}   

type Output = {
    investments: {}
};