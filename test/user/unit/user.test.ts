import { PasswordHasherImpl } from "../../../src/domain/vo/PasswordHasherImpl";
import { UUIDGeneratorImpl } from "../../../src/domain/vo/UUIDGeneratorImpl";
import { User } from "../../../src/domain/entity/User";
import { Nickname } from "../../../src/domain/vo/Nickname";
import { Email } from "../../../src/domain/vo/Email";
import { Hash } from "../../../src/domain/vo/Hash";
import { DateString } from "../../../src/domain/vo/DateString";
import { Currency } from "../../../src/domain/vo/Currency";

const passwordAndUuidGen = () => {
    const uuidGen = new UUIDGeneratorImpl();
    const passwordHasher = new PasswordHasherImpl();
    return  {uuidGen, passwordHasher};
};

test("Criar usuario", () => {
    const { uuidGen, passwordHasher } = passwordAndUuidGen();
    const nickname = new Nickname("Joe Down");
    const email = new Email(`${Math.random()}@gmail.com`)
    const hash = Hash.createFromPassword("12345678", passwordHasher);
    const date = new DateString(new Date().toString());
    const user = new User(
        uuidGen.generate(), nickname,
        email, hash,
        date, date, new Currency("USD")
    );
});