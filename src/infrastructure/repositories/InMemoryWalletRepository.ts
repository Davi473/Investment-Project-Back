import WalletRepository from "../../application/repositories/WalletRepository";
import { Wallet } from "../../domain/entity/Wallet";
import { Currency } from "../../domain/vo/Currency";
import { DateString } from "../../domain/vo/DateString";
import { Nickname } from "../../domain/vo/Nickname";

// =============================================
// In-Memory WalletInvestment Repository
// =============================================
export class PostgresWalletRepository implements WalletRepository {
  constructor( private db: any) {}

  async save(wallet: Wallet): Promise<void> {
    const query = `
      INSERT INTO wallets (id, id_user, name, currency, created_at, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        currency = EXCLUDED.currency,
        type = EXCLUDED.type,
        created_at = EXCLUDED.created_at;
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
    const result: any = await this.db.query("SELECT * FROM wallets WHERE id_user = $1", [idUser]);
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

    async save(wallet: Wallet): Promise<void> 
    {
        this.wallets.push(wallet);
    }

    async findByIdUser(idUser: string): Promise<Wallet[] | null> 
    {
        return this.wallets.filter((wallet) => wallet.idUser == idUser);
    }
}

// =============================================
// In-JSON WalletInvestment Repository
// =============================================
import fs from 'fs/promises';
import path from 'path';
export class InJSONWalletRepository implements WalletRepository {
  private readonly filePath = path.resolve(__dirname, '../../../database/wallet.json');

  private writing: Promise<void> = Promise.resolve();

  private async queueWrite(operation: () => Promise<void>): Promise<void> {
    this.writing = this.writing.then(operation).catch(() => {});
    return this.writing;
  }

  async save(wallet: Wallet): Promise<void> {
    const wallets = await this.readJSONFile();

    wallets.push({
      id: wallet.id,
      idUser: wallet.idUser,
      name: wallet.name.toString(),
      currency: wallet.currency.toString(),
      createdAt: wallet.createdAt.toString(),
      type: wallet.type,
    });

    await this.writeJSONFile(wallets);
  }

  async findByIdUser(idUser: string): Promise<Wallet[] | null> {
    const wallets = await this.readJSONFile();

    const walletsData = wallets.filter((u: any) => u.idUser === idUser);

    if (walletsData.length === 0) return null;

    return walletsData.map((wallet: any) =>
      new Wallet(
        wallet.id,
        wallet.idUser,
        new Nickname(wallet.name),
        new Currency(wallet.currency),
        new DateString(wallet.createdAt),
        wallet.type
      )
    );
  }

  public async readJSONFile(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');

      if (!data || !data.trim()) {
        // arquivo existe mas está vazio
        return [];
      }

      try {
        return JSON.parse(data);
      } catch {
        console.error(`⚠️ Arquivo ${this.filePath} contém JSON inválido. Retornando lista vazia.`);
        return [];
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        // se o arquivo não existir ainda, retorna lista vazia
        return [];
      }
      throw new Error("Erro ao ler o arquivo JSON de wallets");
    }
  }

  public async writeJSONFile(data: any[]): Promise<void> {
    return this.queueWrite(async () => {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    });
  }
}