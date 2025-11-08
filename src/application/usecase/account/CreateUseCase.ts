import { Account } from "../../../domain/entity/Account";
import { UUIDGenerator } from "../../../domain/ports/UUIDGenerator";
import { DateString } from "../../../domain/vo/DateString";
import { Nickname } from "../../../domain/vo/Nickname";
import { AccountRepository } from "../../repositories/AccountRepository";
import UseCase from "../UseCase";

export class CreateUseCase implements UseCase {
    constructor(
        private repository: AccountRepository,
        private uuidGenerator: UUIDGenerator,
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { name, idWallet, amount, category, currency, date } = input;
        const account = new Account(
            this.uuidGenerator.generate(), 
            idWallet, 
            new Nickname(name),
            category,
            amount,
            new DateString(date.toISOString()),
            currency ? currency : "USD"
        );
        await this.repository.save(account);
        return {"menssage": "Conta Adicionada Com Sucesso"};
    }
}

type Input = {
    name: string,
    idWallet: string
    amount: number,
    category: "expense" | "income",
    currency?: string,
    date: Date
}   

type Output = {
    menssage: string,
};