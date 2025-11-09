//=============================
// Http Server And Settings
//=============================
import { HttpServerAdaptorExpress } from "./infrastructure/http/HttpServer";
import { UUIDGeneratorImpl } from "./domain/vo/UUIDGeneratorImpl";
import { PasswordHasherImpl } from "./domain/vo/PasswordHasherImpl";
const HTTP = new HttpServerAdaptorExpress();
const PORT = 3000;
const uuidGen = new UUIDGeneratorImpl();
const passwordHasher = new PasswordHasherImpl();

//=============================
// Config Postgres
//=============================

import { Client } from "pg";

const DB = new Client({
  host: "localhost",
  user: "davi", 
  password: "123",
  database: "investment",
});

async function connectDB() {
  await DB.connect();
  console.log("✅ Conectado ao PostgreSQL com sucesso!");
}
connectDB()

//=============================
// Yahoo Finance Service
//=============================
import { YahooFinanceService } from "./infrastructure/service/YahooFinanceService";
const serviceYahooFinance = new YahooFinanceService();

//=============================
// Currency Service
//=============================
import { InMemoryCurrencyRepository } from "./infrastructure/repositories/InMemoryCurrencyRepository";
import { CurrencyService } from "./infrastructure/service/CurrencyService";
const currencyRepository = new InMemoryCurrencyRepository();
const currencyService = new CurrencyService(currencyRepository, serviceYahooFinance);

//=============================
// User Controller
//=============================
import { InMemoryUserRepository, PostgresUserRepository } from "./infrastructure/repositories/UserRepository";
import { RegisterUser } from "./application/usecase/user/RegisterUser";
import { LoginUser } from "./application/usecase/user/LoginUser";
import { GetUser } from "./application/usecase/user/GetUser";
import UserController from "./infrastructure/controllers/UserController";
const userRepository = new PostgresUserRepository(DB);
const registerUser = new RegisterUser(uuidGen, passwordHasher, userRepository);
const loginUser = new LoginUser(passwordHasher, userRepository);
const getUser = new GetUser(userRepository, currencyService);
const userController = new UserController(registerUser, loginUser, getUser);
HTTP.registerRoutes(userController);

//=============================
// QR Code Controller
//=============================
// import GenerateTotpSecret from "./application/usecase/qrCode/GenerateTotpSecret";
// import QrCodeController from "./infrastructure/controllers/QrCodeController";
// import Authenticator from "./application/usecase/qrCode/Authenticator";

// const generateTotpSecret = new GenerateTotpSecret(userRepository);
// const authenticator = new Authenticator(userRepository);
// const qrCodeController = new QrCodeController(generateTotpSecret, authenticator);
// HTTP.registerRoutes(qrCodeController);

//=============================
// Wallet Controller
//=============================
import { InMemoryWalletRepository, PostgresWalletRepository } from "./infrastructure/repositories/WalletRepository";
import { CreateUseCase } from "./application/usecase/wallet/CreateUseCase";
import { GetUseCase } from "./application/usecase/wallet/GetUseCase";
import WalletController from "./infrastructure/controllers/WalletController";
const walletRepository = new PostgresWalletRepository(DB);
const walletUseCase = new CreateUseCase(walletRepository, uuidGen);
const getWalletUseCase = new GetUseCase(walletRepository, currencyService);
const walletController = new WalletController(walletUseCase, getWalletUseCase);
HTTP.registerRoutes(walletController);

//=============================
// Investment Controller
//=============================
import { InMemoryInvestmentRepository, PostgresInvestmentRepository } from "./infrastructure/repositories/InMemoryInvestmentRepository";
import { InMemoryActionRepository } from "./infrastructure/repositories/InMemoryActionRepository";
import { SaveUseCase } from "./application/usecase/Investment/SaveUseCase";
import { GetUseCase as InvestmentGetUseCase } from "./application/usecase/Investment/GetUseCase";
import InvestmentController from "./infrastructure/controllers/InvestmentController";
import { ActionService } from "./infrastructure/service/ActionService";
// const investmentRepository = new InMemoryInvestmentRepository();
const investmentRepository = new InMemoryInvestmentRepository();
const actionRepository = new InMemoryActionRepository();
const actionService = new ActionService(actionRepository, serviceYahooFinance);
const saveInvestmentUseCase = new SaveUseCase(uuidGen, investmentRepository);
const getInvestmentUseCase = new InvestmentGetUseCase(investmentRepository, actionService, currencyService);
const investmentController = new InvestmentController(saveInvestmentUseCase, getInvestmentUseCase);
HTTP.registerRoutes(investmentController);

//=============================
// Account Controller
//=============================
// import { InMemoryAccountRepository } from "./infrastructure/repositories/InMemoryAccountRepository";
// import { CreateUseCase as AccountCreateUseCase } from "./application/usecase/account/CreateUseCase";
// import { GetUseCase as AccountGetUseCase } from "./application/usecase/account/GetUseCase";
// import AccountController from "./infrastructure/controllers/AccountController";
// const accountRepository = new InMemoryAccountRepository();
// const createAccountUseCase = new AccountCreateUseCase(accountRepository, uuidGen);
// const getAccountUseCase = new AccountGetUseCase(accountRepository);
// const accountController = new AccountController(createAccountUseCase, getAccountUseCase);
// HTTP.registerRoutes(accountController);

//=============================
// Investment Controller
//=============================
import { InMemoryOptionRepository } from "./infrastructure/repositories/InMemoryOptionRepository";
import { SaveUseCase as OptionSaveUseCase } from "./application/usecase/option/SaveUseCase";
import { GetUseCase as OptionGetUseCase } from "./application/usecase/option/GetUseCase";
import OptionController from "./infrastructure/controllers/OptionController";
const optionRepository = new InMemoryOptionRepository();
const optionSaveUseCase = new OptionSaveUseCase(uuidGen, optionRepository);
const optionGetUseCase = new OptionGetUseCase(optionRepository, actionService);
const optionController = new OptionController(optionSaveUseCase, optionGetUseCase);
HTTP.registerRoutes(optionController);

HTTP.listen(PORT);