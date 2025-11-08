import { InMemoryAccountRepository } from "../../src/infrastructure/repositories/InMemoryAccountRepository";
import { CreateUseCase as AccountCreateUseCase } from "../../src/application/usecase/account/CreateUseCase";
import { UUIDGeneratorImpl } from "../../src/domain/vo/UUIDGeneratorImpl";
import { GetUseCase as AccountGetUseCase } from "../../src/application/usecase/account/GetUseCase";

test("Save Account", async () => {
    const accountRepository = new InMemoryAccountRepository();
    const uuidGen = new UUIDGeneratorImpl();
    const createAccountUseCase = new AccountCreateUseCase(accountRepository, uuidGen);
    const getAccountUseCase = new AccountGetUseCase(accountRepository);
    const idWallet = uuidGen.generate();
    await createAccountUseCase.execute({
        name: "Salary",
        idWallet,
        amount: 2500,
        category: "income",
        currency: "BRL",
        date: new Date("2025-10-05")
    });
    await createAccountUseCase.execute({
        name: "Card BTG",
        idWallet,
        amount: 830,
        category: "expense",
        currency: "BRL",
        date: new Date("2025-10-18")
    });
    await createAccountUseCase.execute({
        name: "Investment",
        idWallet,
        amount: 250,
        category: "expense",
        currency: "BRL",
        date: new Date("2025-10-07")
    });
    const save: any = await getAccountUseCase.execute({ idWallet, month: "10", year: "2025" });
    console.log(await save.accounts.reduce((enter: number, bill: any) => {
        if (bill.category === "expense")
            enter -= bill.amount;
        if (bill.category === "income")
            enter += bill.amount;
        return enter;
    }, 0));
}, 20000);

