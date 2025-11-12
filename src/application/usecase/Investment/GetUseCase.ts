import UseCase from "../UseCase";
import { InvestmentRepository } from "../../repositories/InvestmentRepository";
import { Investment } from "../../../domain/entity/Investment";
import { ActionService } from "../../../infrastructure/service/ActionService";
import { CurrencyService } from "../../../infrastructure/service/CurrencyService";

export class GetUseCase implements UseCase {
    constructor(
        private repository: InvestmentRepository,
        private actionService: ActionService,
        private currencyService: CurrencyService
    ) { }

    public async execute(input: Input): Promise<Output> {
        const { idWallet } = input;
        const investments: Investment[] | null = await this.repository.findByIdWallet(idWallet);
        if (!investments) return { investments: [] }
        const investmentValue: Map<string, any> = new Map();
        for (const investment of investments) {
            const name = investment.name.toString();

            if (!investmentValue.has(name)) {
                investmentValue.set(name, {
                    nickname: name,
                    quantity: investment.quantity,
                    average: investment.average,
                    currency: investment.currency,
                    category: investment.category,
                    currentValue: 0,
                    userCurrency: 0,
                });
                continue;
            }

            const value = investmentValue.get(name)!;
            let quantity: number;
            let average: number;

            const totalBefore = value.average * value.quantity;
            const totalOperation = investment.average * investment.quantity;

            if (investment.buy) {
                quantity = value.quantity + investment.quantity;
                average = (totalBefore + totalOperation) / quantity;
            } else {
                quantity = value.quantity - investment.quantity;
                average = quantity > 0 ? (totalBefore - totalOperation) / quantity : 0;
            }

            investmentValue.set(name, {
                ...value,
                quantity,
                average,
            });
        }

        const investmentValueOutput = Array.from(investmentValue.values());
        await Promise.all(
            investmentValueOutput.map(async (investment) => {
                const [value, currencyValueInvestment] = await Promise.all([
                    this.actionService.get(investment.nickname),
                    this.currencyService.get(investment.currency)
                ]);

                investment.currentValue = value.amount;
                investment.userCurrency = currencyValueInvestment.value;
            })
        );

        return { investments: investmentValueOutput };
    }
}

type Input = {
    idWallet: string,
}

type Output = {
    investments: {}
};