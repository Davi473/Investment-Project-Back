import WalletRepository from "../../application/repositories/WalletRepository";
import { Wallet } from "../../domain/entity/Wallet";
import { Currency } from "../../domain/vo/Currency";
import { DateString } from "../../domain/vo/DateString";
import { Nickname } from "../../domain/vo/Nickname";

// =============================================
// In-Memory WalletInvestment Repository
// =============================================
export class PostgresWalletRepository implements WalletRepository {
  constructor(private db: any) { }

  async save(wallet: Wallet): Promise<void> {
    const query = `
      INSERT INTO wallet (id, id_user, name, currency, created_at, type)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await this.db.query(query, [
      wallet.id,
      wallet.idUser,
      wallet.name.toString(),
      wallet.currency.toString(),
      wallet.createdAt.toString(),
      wallet.type,
    ]);
  }

  async findByIdUser(idUser: string): Promise<Wallet[] | null> {
    const result: any = await this.db.query("SELECT * FROM wallet WHERE id_user = $1", [idUser]);
    if (result.rows.length === 0) return null;
    return result.rows.map(
      (row: any) =>
        new Wallet(
          row.id,
          row.id_user,
          new Nickname(row.name),
          new Currency(row.currency),
          new DateString(row.created_at.toISOString()),
          row.type
        )
    );
  }
}

// =============================================
// In-Memory WalletInvestment Repository
// =============================================
export class InMemoryWalletRepository implements WalletRepository {
  private wallets: Wallet[] = [];

  async save(wallet: Wallet): Promise<void> {
    this.wallets.push(wallet);
  }

  async findByIdUser(idUser: string): Promise<Wallet[] | null> {
    return this.wallets.filter((wallet) => wallet.idUser == idUser);
  }
}