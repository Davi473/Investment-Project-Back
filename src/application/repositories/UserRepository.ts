import { User } from "../../domain/entity/User";
import { Email } from "../../domain/vo/Email";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
