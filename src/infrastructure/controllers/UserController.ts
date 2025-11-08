import { Body, Controller, Get, Post, Put } from "../decorators/Method";
import { RegisterUser } from "../../application/usecase/user/RegisterUser";
import { LoginUser } from "../../application/usecase/user/LoginUser";
import { Auth, UserAuth } from "../decorators/Auth";
import { GetUser } from "../../application/usecase/user/GetUser";

@Controller("/users")
export default class UserController 
{
    constructor(
        private registerUser: RegisterUser,
        private loginUser: LoginUser,
        private getUser: GetUser
    ) {}
    
    @Post()
    async register(@Body() user: any, res: any): Promise<any>
    {
        const input = user;
        const output = await this.registerUser.execute(input);
        res.status(201).json(output);
    }

    @Put()
    async login(@Body() user: any, res: any): Promise<any>
    {
        const input = user;
        const output = await this.loginUser.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get()
    public async get(@UserAuth() user: any, res: any): Promise<any>
    {
        const input = user;
        const output = await this.getUser.execute(input);
        res.status(201).json(output);
    }
}