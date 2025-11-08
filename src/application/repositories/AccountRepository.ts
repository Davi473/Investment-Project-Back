import { Account } from "../../domain/entity/Account";

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findByIdWallet(idWallet: string): Promise<Account[] | null>;
}
