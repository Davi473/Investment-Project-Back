import { AccountRepository } from "../../application/repositories/AccountRepository";
import { Account } from "../../domain/entity/Account";
import { DateString } from "../../domain/vo/DateString";
import { Nickname } from "../../domain/vo/Nickname";


export class InMemoryAccountRepository implements AccountRepository {
    private memory: Account[] = [];

    public async save(account: Account): Promise<void> {
        this.memory.push(account);
    }

    public async findByIdWallet(idWallet: string): Promise<Account[] | null> {
        return this.memory.filter((account) => account.idWallet === idWallet);
    }
}

export class PostgresAccountRepository implements AccountRepository {
    constructor(private db: any) { }

    public async save(account: Account): Promise<void> {
        const query = `
            INSERT INTO account (id, id_wallet, name, category, amount, created, currency)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await this.db.query(query, [
            account.id,
            account.idWallet,
            account.name.toString(),
            account.category,
            account.amount,
            new Date(account.created.toString()),
            account.currency,
        ]);
    }

    public async findByIdWallet(idWallet: string): Promise<Account[] | null> {
        const query = `SELECT * FROM account WHERE id_wallet = $1`;
        const { rows } = await this.db.query(query, [idWallet]);

        if (rows.length === 0) return null;

        return rows.map((row: any) => new Account(
            row.id,
            row.id_wallet,
            new Nickname(row.name),
            row.category,
            parseFloat(row.amount),
            new DateString(row.created),
            row.currency
        ));
    }
}
