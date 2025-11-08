import { Nickname } from "../vo/Nickname";
import { DateString } from "../vo/DateString";

export class Account {
    constructor(
        readonly id: string,
        readonly idWallet: string,
        readonly name: Nickname,
        readonly category: "expense" | "income",
        readonly amount: number,
        readonly created: DateString,
        readonly currency: string,
    ) {}
}
