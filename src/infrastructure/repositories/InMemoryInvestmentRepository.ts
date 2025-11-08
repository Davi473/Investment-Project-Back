import { InvestmentRepository } from "../../application/repositories/InvestmentRepository";
import { Investment } from "../../domain/entity/Investment";
import { DateString } from "../../domain/vo/DateString";
import { Nickname } from "../../domain/vo/Nickname";

export class PostgresInvestmentRepository implements InvestmentRepository {
  constructor(private db: any) { }

  async save(investment: Investment): Promise<void> {
    const query = `
    INSERT INTO investments (id, id_wallet, name, category, buy, quantity, average, created_at, currency)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      category = EXCLUDED.category,
      buy = EXCLUDED.buy,
      quantity = EXCLUDED.quantity,
      average = EXCLUDED.average,
      created_at = EXCLUDED.created_at,
      currency = EXCLUDED.currency;
  `;

    await this.db.query(query, [
      investment.id,
      investment.idWallet,
      investment.name.toString(),
      investment.category,
      investment.buy,
      investment.quantity,
      investment.average,
      investment.created.toString(),
      investment.currency.toString()
    ]);
  }

  async findByIdWallet(idWallet: string): Promise<Investment[] | null> {
    const query = `SELECT * FROM investments WHERE id_wallet = $1`;
    const result = await this.db.query(query, [idWallet]);

    if (result.rows.length === 0) return null;

    return result.rows.map((row: any) =>
      new Investment(
        row.id,
        row.id_wallet,
        new Nickname(row.name),
        row.category,
        row.buy,
        Number(row.quantity),
        Number(row.average),
        new DateString(row.created_at.toISOString()),
        row.currency
      )
    );
  }
}

export class InMemoryInvestmentRepository implements InvestmentRepository {
  private investments: Investment[] = [];

  async save(investment: Investment): Promise<void> {
    this.investments.push(investment);
  }

  async findByIdWallet(idWallet: string): Promise<Investment[] | null> {
    return this.investments.filter((investment) => investment.idWallet === idWallet);
  }
}

import fs from 'fs/promises';
export class InJSONInvestmentRepository implements InvestmentRepository {
  private readonly filePath = require('path').resolve(__dirname, '../../../database/investment.json');

  async save(investment: Investment): Promise<void> {
    const investments = await this.readJSONFile();
    investments.push({
      id: investment.id,
      idWallet: investment.idWallet,
      name: investment.name.toString(),
      idCategory: investment.category,
      buy: investment.buy,
      quantity: investment.quantity,
      average: investment.average,
      created: investment.created.toString(),
      idCurrency: investment.currency,
    });
    await this.writeJSONFile(investments);
  }

  async findByIdWallet(idWallet: string): Promise<Investment[] | null> {
    const investments = await this.readJSONFile();
    const investmentData = investments.find((u: any) => u.idWallet === idWallet);
    if (!investmentData) return null;
    return investmentData.map((investment: any) => new Investment(
      investment.id,
      investment.idWallet,
      new Nickname(investment.name),
      investment.category,
      investment.buy,
      investment.quantity,
      investment.average,
      new DateString(investment.created),
      investment.currency
    ));
  }

  public async readJSONFile(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw err;
    }
  }

  public async writeJSONFile(data: any[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}