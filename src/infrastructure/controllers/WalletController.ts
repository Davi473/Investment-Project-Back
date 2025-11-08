import { CreateUseCase } from "../../application/usecase/wallet/CreateUseCase";
import { GetUseCase } from "../../application/usecase/wallet/GetUseCase";
import { Auth, UserAuth } from "../decorators/Auth";
import { Body, Controller, Post, Get } from "../decorators/Method";

@Controller("/wallet")
export default class WalletController 
{
    constructor(
        private createWallet: CreateUseCase,
        private getWallet: GetUseCase
    ) {}
    
    @Auth()
    @Post("/investment")
    async createInvestment(@Body() wallet: any, @UserAuth() user: any, res: any): Promise<any>
    {
        const input = { ...wallet, idUser: user.id, type: "i" };
        const output = await this.createWallet.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get("/investment")
    async getInvestment(@UserAuth() user: any, res: any): Promise<any>
    {
        const input = { ...user, type: "i"};
        const output = await this.getWallet.execute(input);
        res.status(201).json(output);
    }

     @Auth()
    @Post("/account")
    async createBill(@Body() wallet: any, @UserAuth() user: any, res: any): Promise<any>
    {
        const input = { ...wallet, idUser: user.id, type: "a" };
        const output = await this.createWallet.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get("/account")
    async get(@UserAuth() user: any, res: any): Promise<any>
    {
        const input =  {...user, type: "a"};
        const output = await this.getWallet.execute(input);
        res.status(201).json(output);
    }
}