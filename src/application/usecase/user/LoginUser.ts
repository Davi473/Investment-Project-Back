import { generateToken } from "../../../infrastructure/middlewares/TokenAuth";
import { PasswordHasher } from "../../../domain/ports/PasswordHasher";
import { UserRepository } from "../../repositories/UserRepository";
import { Email } from "../../../domain/vo/Email";
import { Hash } from "../../../domain/vo/Hash";
import UseCase from "../UseCase";
import { Currency } from "../../../domain/vo/Currency";

export class LoginUser implements UseCase {
    constructor(
        private passwordHasher: PasswordHasher,
        private userRepository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { email, password } = input;
        const emailValue = new Email(email);
        const existingUser = await this.userRepository.findByEmail(emailValue);
        if (existingUser === null) throw new Error("Usuário não encontrado");
        const hash = Hash.createFromPassword(password, this.passwordHasher);
        const passwordExist = hash.toString() === existingUser.hash.toString();
        if (!passwordExist) throw new Error("Senha incorreta");
        return {"menssage": "Usuário autenticado com sucesso",
            "token": generateToken({id: existingUser.id.toString(), 
                email: existingUser.email.toString(), 
                nickname: existingUser.nickname.toString(),
                currency: existingUser.currency.toString()
            })};
    }
}

type Input = {
    email: string,
    password: string
}   

type Output = {
    menssage: string,
    token: string
};