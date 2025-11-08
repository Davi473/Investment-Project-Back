import Option from "../../domain/entity/Option";

export interface OptionRepository {
  save(option: Option): Promise<void>;
  findByIdWallet(id: string): Promise<Option[] | null>;
  findById(id: string): Promise<Option[] | null>;
}
