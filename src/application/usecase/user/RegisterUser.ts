import { PasswordHasher } from "../../../domain/ports/PasswordHasher";
import { UUIDGenerator } from "../../../domain/ports/UUIDGenerator";
import { UserRepository } from "../../repositories/UserRepository";
import { Nickname } from "../../../domain/vo/Nickname";
import { User } from "../../../domain/entity/User";
import { Email } from "../../../domain/vo/Email";
import { Hash } from "../../../domain/vo/Hash";
import UseCase from "../UseCase";
import { DateString } from "../../../domain/vo/DateString";
import { Currency } from "../../../domain/vo/Currency";

export class RegisterUser implements UseCase 
{
    constructor(
        private uuidGenerator: UUIDGenerator,
        private passwordHasher: PasswordHasher,
        private userRepository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { name, email, password } = input;
        const nameValue = new Nickname(name);
        const emailValue = new Email(email);
        const existingUser = await this.userRepository.findByEmail(emailValue);
        if (existingUser) throw new Error("Usuário já existe");
        const id = this.uuidGenerator.generate();
        const hash = Hash.createFromPassword(password, this.passwordHasher);
        const now = new DateString(new Date().toString());
        const user = new User(id, nameValue, emailValue, hash, now, now, new Currency("USD"));
        await this.userRepository.save(user);
        return {"menssage": "Usuário criado com sucesso"};
    }
}

type Input = {
    name: string,
    email: string,
    password: string
}   

type Output = {
    menssage: string
};