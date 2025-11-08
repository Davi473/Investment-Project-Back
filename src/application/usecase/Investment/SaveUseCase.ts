import { UUIDGenerator } from "../../../domain/ports/UUIDGenerator";
import { Nickname } from "../../../domain/vo/Nickname";
import UseCase from "../UseCase";
import { DateString } from "../../../domain/vo/DateString";
import { InvestmentRepository } from "../../repositories/InvestmentRepository";
import { Investment } from "../../../domain/entity/Investment";

export class SaveUseCase implements UseCase 
{
    constructor(
        private uuidGenerator: UUIDGenerator,
        private investmentRepository: InvestmentRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        // Validar A Entrada Dos Dados
        const { idWallet, name, category, buy, quantity, average, created, currency } = input;
        const id = this.uuidGenerator.generate();
        const nameInvestment = new Nickname(name);
        const dateInvestment = new DateString(new Date(created).toISOString());
        const investment = new Investment(id, idWallet, nameInvestment, category, buy, quantity, average, dateInvestment, currency);
        await this.investmentRepository.save(investment);
        return {"menssage": "Save with success"};
    }
}

type Input = {
    idWallet: string,
    name: string,
    category: string,
    buy: boolean,
    quantity: number,
    average: number,
    created: string,
    currency: string,
}   

type Output = {
    menssage: string
};