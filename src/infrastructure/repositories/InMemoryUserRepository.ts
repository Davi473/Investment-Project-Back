import { UserRepository } from "../../application/repositories/UserRepository";
import { User } from "../../domain/entity/User";
import { Currency } from "../../domain/vo/Currency";
import { DateString } from "../../domain/vo/DateString";
import { Email } from "../../domain/vo/Email";
import { Hash } from "../../domain/vo/Hash";
import { Nickname } from "../../domain/vo/Nickname";

export class InMemoryUserRepository implements UserRepository 
{
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.email.toString(), user);
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.get(email.toString()) || null;
  }

  async findById(id: string): Promise<User | null> {
    let userExist: User | null = null;

    this.users.forEach(user => {
      if (user.id === id)
        userExist = user;
    })

    return userExist;
  }
}

export class PostgresUserRepository implements UserRepository {
  constructor(private db: any) {}
  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (id, nickname, email, hash, created_at, updated_at, currency)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email)
      DO UPDATE SET
        nickname = EXCLUDED.nickname,
        hash = EXCLUDED.hash,
        updated_at = EXCLUDED.updated_at,
        currency = EXCLUDED.currency;
    `;

    await this.db.query(query, [
      user.id,
      user.nickname.toString(),
      user.email.toString(),
      user.hash.toString(),
      user.createdAt.toString(),
      user.updatedAt.toString(),
      user.currency.toString(),
    ]);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const result = await this.db.query("SELECT * FROM users WHERE email = $1", [email.toString()]);
    const row = result.rows[0];
    if (!row) return null;

    return new User(
      row.id,
      new Nickname(row.nickname),
      new Email(row.email),
      new Hash(row.hash),
      new DateString(row.created_at.toISOString()),
      new DateString(row.updated_at.toISOString()),
      new Currency(row.currency)
    );
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query("SELECT * FROM users WHERE id = $1", [id]);
    const row = result.rows[0];
    if (!row) return null;

    return new User(
      row.id,
      new Nickname(row.nickname),
      new Email(row.email),
      new Hash(row.hash),
      new DateString(row.created_at.toISOString()),
      new DateString(row.updated_at.toISOString()),
      new Currency(row.currency)
    );
  }
}

export class InJSONUserRepository implements UserRepository 
{
  private readonly filePath = require('path').resolve(__dirname, '../../../database/user.json');

  async save(user: User): Promise<void> 
  {
    const users = await this.readJSONFile();
    users.push({
      id: user.id,
      nickname: user.nickname.toString(),
      email: user.email.toString(),
      hash: user.hash.toString(),
      createdAt: user.createdAt.toString(),
      updatedAt: user.updatedAt.toString(),
      currency: user.currency.toString(),
    });
    await this.writeJSONFile(users);
  }

  async findByEmail(email: Email): Promise<User | null> 
  {
    const users = await this.readJSONFile();
    const userData = users.find((u: any) => u.email === email.toString());
    if (!userData) return null;
    return new User(
      userData.id,
      new Nickname(userData.nickname),
      new Email(userData.email),
      new Hash(userData.hash),
      new DateString(userData.createdAt),
      new DateString(userData.updatedAt),
      new Currency(userData.currency),
    );
  }

  async findById(id: string): Promise<User | null> {
    const users = await this.readJSONFile();
    const userData = users.find((u: any) => u.id === id.toString());
    if (!userData) return null;
    return new User(
      userData.id,
      new Nickname(userData.nickname),
      new Email(userData.email),
      new Hash(userData.hash),
      new DateString(userData.createdAt),
      new DateString(userData.updatedAt),
      new Currency(userData.currency),
    ); 
  }

  public async readJSONFile(): Promise<any[]> 
  {
    const fs = await import('fs/promises');
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

  public async writeJSONFile(data: any[]): Promise<void> 
  {
    const fs = await import('fs/promises');
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}