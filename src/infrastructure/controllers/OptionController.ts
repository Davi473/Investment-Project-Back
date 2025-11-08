import { GetUseCase } from "../../application/usecase/option/GetUseCase";
import { SaveUseCase } from "../../application/usecase/option/SaveUseCase";
import { Auth, UserAuth } from "../decorators/Auth";
import { Body, Controller, Get, Params, Post } from "../decorators/Method";

@Controller("/option")
export default class OptionController 
{
    constructor(
        private saveUseCase: SaveUseCase,
        private getUseCase: GetUseCase
    ) {}
    
    @Auth()
    @Post("/:idWallet")
    async save(
        @Body() option: any, 
        @Params() wallet: any, 
        res: any
    ): Promise<any>
    {   
        const input = { ...option, idWallet: wallet.idWallet };
        const output = await this.saveUseCase.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get("/:idWallet")
    async get(
        @Params() wallet: any, res: any
    ): Promise<any> {
        const input = { idWallet: wallet.idWallet };
        const output = await this.getUseCase.execute(input);
        res.status(201).json(output);
    }
}