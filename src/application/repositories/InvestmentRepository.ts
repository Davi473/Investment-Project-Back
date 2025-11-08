import { Investment } from "../../domain/entity/Investment";

export interface InvestmentRepository {
  save(investment: Investment): Promise<void>;
  findByIdWallet(idWallet: string): Promise<Investment[] | null>;
}
