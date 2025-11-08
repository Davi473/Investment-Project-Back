import UseCase from "../UseCase";
import { OptionRepository } from "../../repositories/OptionRepository";
import { ActionService } from "../../../infrastructure/service/ActionService";

export class GetUseCase implements UseCase 
{
    constructor(
        private repository: OptionRepository,
        private actionService: ActionService,
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idWallet } = input;
        const options = await this.repository.findByIdWallet(idWallet);
        if (!options) return { options: [] }
        const optionsValue = [];
        for ( const option of options) {
            const valueAsset = await this.actionService.get(option.asset);
            option.setCurrentPrice(valueAsset.amount);
            optionsValue.push({ id: option.id, asset: option.asset, profit: option.getProfit() });
        }
        return { options: optionsValue };
    }
}

type Input = {
    idWallet: string,
}   

type Output = {
    options: {}
};