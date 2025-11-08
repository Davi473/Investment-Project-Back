import { Currency } from "../vo/Currency";
import { DateString } from "../vo/DateString";
import { Nickname } from "../vo/Nickname";

export class Wallet 
{
    constructor(
        readonly id: string,
        readonly idUser: string,
        readonly name: Nickname,
        readonly currency: Currency,
        readonly createdAt: DateString,
        readonly type: string,
    ) {}
}