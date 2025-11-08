import { UUIDGenerator } from "../../../domain/ports/UUIDGenerator";
import UseCase from "../UseCase";
import { OptionRepository } from "../../repositories/OptionRepository";
import Option from "../../../domain/entity/Option";

export class SaveUseCase implements UseCase 
{
    constructor(
        private uuidGenerator: UUIDGenerator,
        private repository: OptionRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        // Validar A Entrada Dos Dados
        const { idWallet, asset, rate, type, strikePrice } = input;
        const id = this.uuidGenerator.generate();
        const option = new Option(id, idWallet, asset, rate, type, strikePrice);
        await this.repository.save(option);
        return {"menssage": "Save with success"};
    }
}

type Input = {
    idWallet: string,
    asset: string,
    rate: number,
    type: string,
    strikePrice: number,
}   

type Output = {
    menssage: string
};