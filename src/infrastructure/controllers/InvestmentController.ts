import { SaveUseCase } from "../../application/usecase/Investment/SaveUseCase";
import { GetUseCase } from "../../application/usecase/Investment/GetUseCase";
import { Auth, UserAuth } from "../decorators/Auth";
import { Body, Controller, Get, Params, Post } from "../decorators/Method";

@Controller("/investment")
export default class InvestmentController 
{
    constructor(
        private saveUseCase: SaveUseCase,
        private getUseCase: GetUseCase
    ) {}
    
    @Auth()
    @Post("/:idWallet")
    async save(
        @Body() investment: any, 
        @Params() wallet: any, 
        res: any
    ): Promise<any>
    {   
        const input = { ...investment, idWallet: wallet.idWallet };
        const output = await this.saveUseCase.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get("/:idWallet")
    async get(
        @UserAuth() user: any,
        @Params() wallet: any, res: any
    ): Promise<any> {
        const input = { idWallet: wallet.idWallet };
        const output = await this.getUseCase.execute(input);
        res.status(201).json(output);
    }
}