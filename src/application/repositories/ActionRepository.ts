import { Action } from "../../domain/entity/Action";

export interface ActionRepository {
  save(action: Action): Promise<void>;
  findById(id: string): Promise<Action | null>;
  findByName(name: string): Promise<Action | null>;
  findAll(): Promise<Action[]>
}
