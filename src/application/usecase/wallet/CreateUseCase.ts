import { Wallet } from "../../../domain/entity/Wallet";
import { UUIDGenerator } from "../../../domain/ports/UUIDGenerator";
import { Currency } from "../../../domain/vo/Currency";
import { DateString } from "../../../domain/vo/DateString";
import { Nickname } from "../../../domain/vo/Nickname";
import WalletRepository from "../../repositories/WalletRepository";
import UseCase from "../UseCase";

export class CreateUseCase implements UseCase {
    constructor(
        private walletRepository: WalletRepository,
        private uuidGenerator: UUIDGenerator,
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idUser, name, currency, type } = input;
        const wallet = new Wallet(
            this.uuidGenerator.generate(), 
            idUser, 
            new Nickname(name),
            new Currency(currency ? currency : "USD"),
            new DateString(new Date().toISOString()),
            type
        );
        this.walletRepository.save(wallet);
        return {"menssage": "Wallet criada com sucesso."};
    }
}

type Input = {
    idUser: string,
    name: string
    currency?: string,
    type: "a" | "i"
}   

type Output = {
    menssage: string,
};