import { InMemoryUserRepository } from "../../../src/infrastructure/repositories/InMemoryUserRepository";
import { RegisterUser } from "../../../src/application/usecase/user/RegisterUser"
import { UUIDGeneratorImpl } from "../../../src/domain/vo/UUIDGeneratorImpl";
import { PasswordHasherImpl } from "../../../src/domain/vo/PasswordHasherImpl";

const makeRegisterUser = () => {
    const userRepository = new InMemoryUserRepository();
    const uuidGen = new UUIDGeneratorImpl();
    const passwordHasher = new PasswordHasherImpl();
    const registerUser = new RegisterUser(uuidGen, passwordHasher, userRepository);

    return registerUser;
};

test("Register User", async () => {
    const registerUser = makeRegisterUser();
    const userData = {
        nickname: "John Doe",
        email: `${Math.random()}@example.com`,
        password: "123@Test"
    }
    const registro = await registerUser.execute(userData);
    expect(registro).toBeDefined();
    expect(registro.menssage).toBe("Usuário criado com sucesso");
});

test("Email ja cadastrado", async () => {
    const registerUser = makeRegisterUser();
    const fixedEmail = "john.doe@example.com";
    const userData = {
        nickname: "John Doe",
        email: fixedEmail,
        password: "123@Test"
    }
    await registerUser.execute(userData);
    await expect(registerUser.execute(userData))
        .rejects.toThrow("Usuário já existe");
});

test("Nome curto", async () => {
    const registerUser = makeRegisterUser();
    const userData = {
        nickname: "Oi",
        email: `${Math.random()}@example.com`,
        password: "123@Test"
    }
    await expect(registerUser.execute(userData))
        .rejects.toThrow("Nickname muito curto");
});