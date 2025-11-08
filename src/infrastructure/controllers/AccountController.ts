import { CreateUseCase } from "../../application/usecase/account/CreateUseCase";
import { GetUseCase } from "../../application/usecase/account/GetUseCase";
import { Auth, UserAuth } from "../decorators/Auth";
import { Body, Controller, Post, Get, Params } from "../decorators/Method";

@Controller("/account")
export default class AccountController 
{
    constructor(
        private create: CreateUseCase,
        private get: GetUseCase
    ) {}
    
    @Auth()
    @Post("/:idWallet")
    public async createAccount(
        @Body() account: any,
        @Params() wallet: any, 
        res: any
    ): Promise<any> {
        const input = { ...account, idWallet: wallet.idWallet };
        const output = await this.create.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get("/:idWallet")
    async getAccount(
        @UserAuth() user: any, 
        @Params() wallet: any, 
        res: any
    ): Promise<any> {
        const input = { idWallet: wallet.idWallet };
        const output = await this.get.execute(input);
        res.status(201).json(output);
    }
}