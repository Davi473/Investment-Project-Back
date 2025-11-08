import { CurrencyService } from "../../../infrastructure/service/CurrencyService";
import { UserRepository } from "../../repositories/UserRepository";
import UseCase from "../UseCase";

export class GetUser implements UseCase {
    constructor(
        private userRepository: UserRepository,
        private currencyService: CurrencyService
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { id } = input;
        const existingUser = await this.userRepository.findById(id);
        if (existingUser === null) throw new Error("Usuário não encontrado");
        const currencyValue = await this.currencyService.get(existingUser.currency.toString());
        return {"menssage": "Seja Bem-vindo", user: {
            id: existingUser.id,
            name: existingUser.nickname.toString(),
            email: existingUser.email.toString(),
            currency: existingUser.currency.toString(),
            value: currencyValue.value
        }};
    }
}

type Input = {
    id: string
}   

type Output = {
    menssage: string,
    user: any
};