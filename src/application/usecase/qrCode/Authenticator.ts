import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { UserRepository } from '../../repositories/UserRepository';
import UseCase from '../UseCase';
import { Email } from '../../../domain/vo/Email';

export default class Authenticator implements UseCase 
{
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(input: Input): Promise<any> 
    {
        const {code, email} = input;
        const existingSecret = await this.userRepository.findByEmail(new Email(email));
        if (!existingSecret) throw new Error("Usuário não encontrado");

        // // Recupera o secret salvo no banco (base32)
        // const secret = existingSecret.twoFactorSecret; // Ex.: campo no seu modelo

        // const verified = speakeasy.totp.verify({
        //     secret: secret,
        //     encoding: "base32",
        //     token: token,
        //     window: 1 // tolerância para códigos próximos (opcional)
        // });

        // if (!verified) {
        //     throw new Error("Código inválido");
        // }

        // return { message: "Código válido" };
    }
}

type Input = {
  code: string;
  email: string;
};