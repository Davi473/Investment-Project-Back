import { Email } from "../vo/Email";
import { Nickname } from "../vo/Nickname";
import { Hash } from "../vo/Hash";
import { DateString } from "../vo/DateString";
import { Currency } from "../vo/Currency";

export class User 
{
  constructor(
    readonly id: string,
    readonly nickname: Nickname,
    readonly email: Email,
    readonly hash: Hash,
    readonly createdAt: DateString,
    readonly updatedAt: DateString,
    readonly currency: Currency,
  ) {}
}
