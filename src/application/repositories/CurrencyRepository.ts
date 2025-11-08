export interface CurrencyRepository {
  save(currency: any): Promise<void>;
  findById(id: string): Promise<any | null>;
  findByName(name: string): Promise<any | null>;
  findAll(): Promise<any[]>
}
