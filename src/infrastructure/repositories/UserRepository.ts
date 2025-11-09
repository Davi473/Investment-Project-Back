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
      INSERT INTO users (id, name, email, hash, created_at, updated_at, currency)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
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
      new Nickname(row.name),
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
      new Nickname(row.name),
      new Email(row.email),
      new Hash(row.hash),
      new DateString(row.created_at.toISOString()),
      new DateString(row.updated_at.toISOString()),
      new Currency(row.currency)
    );
  }
}