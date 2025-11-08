import { Wallet } from "../../domain/entity/Wallet";

export default interface WalletRepository 
{
    save(wallet: Wallet): Promise<void>;
    findByIdUser(idUser: string): Promise<Wallet[] | null>;
}