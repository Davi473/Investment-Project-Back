import { OptionRepository } from "../../application/repositories/OptionRepository";
import Option from "../../domain/entity/Option";

export class InMemoryOptionRepository implements OptionRepository {
    private options: Option[] = [];

    constructor() {
        // Test
        this.options.push(new Option(
            crypto.randomUUID(),
            "3328e570-8082-4ab0-bf05-f9ff06d99bce",
            "ABEV3.SA",
            0.58,
            "call",
            10.50
        ))
    }

    async save(option: Option): Promise<void>
    {
        this.options.push(option);
    }

    async findByIdWallet(id: string): Promise<Option[] | null> {
        return this.options.filter((option) => option.idWallet === id);
    }

    async findById(id: string): Promise<Option[] | null> {
        return this.options.filter((option) => option.id === id);
    }
}