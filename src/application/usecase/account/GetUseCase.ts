import UseCase from "../UseCase";
import { AccountRepository } from "../../repositories/AccountRepository";
import { Account } from "../../../domain/entity/Account";

export class GetUseCase implements UseCase {
    constructor(
        private repository: AccountRepository
    ) { }

    public async execute(input: Input): Promise<Output> {
        const { idWallet, month, year } = input;
        let accounts: Account[] | null = await this.repository.findByIdWallet(idWallet);
        if (!accounts) return { accounts: [] };
        accounts = accounts.filter(account => {
            if (
                month === account.created.toMonth() &&
                year === account.created.toYear()
            )
                return account;
        })
        return {
            accounts: accounts ? accounts.map(account => ({
                id: account.id,
                nickname: account.name.toString(),
                amount: account.amount,
                category: account.category,
                currency: account.currency,
                created: account.created.toString()
            })) : []
        };
    }
}

type Input = {
    idWallet: string,
    month: string,
    year: string
}

type Output = {
    accounts: {}
};