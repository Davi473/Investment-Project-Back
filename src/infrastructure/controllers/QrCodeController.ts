import Authenticator from "../../application/usecase/qrCode/Authenticator";
import GenerateTotpSecret from "../../application/usecase/qrCode/GenerateTotpSecret";
import { Auth, UserAuth } from "../decorators/Auth";
import { Body, Controller, Get, Post } from "../decorators/Method";

@Controller("/qrcode")
export default class QrCodeController 
{
    constructor(
        private generateTotpSecret: GenerateTotpSecret,
        private authenticatorUseCase: Authenticator
    ) {}
    
    @Auth()
    @Get("/generate-totp-secret")
    async generateTotp(@UserAuth() user: any, res: any): Promise<any>
    {
        const input = user;
        const output = await this.generateTotpSecret.execute(input);
        res.status(201).json(output);
    }


    @Post("/authenticator")
    async authenticator(@Body() user: any, res: any): Promise<any>
    {
        const input = user;
        const output = await this.authenticatorUseCase.execute(input);
        res.status(201).json(output);
    }
}