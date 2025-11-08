import { Nickname } from "../vo/Nickname";
import { DateString } from "../vo/DateString";

export class Investment 
{
  constructor(
    readonly id: string,
    readonly idWallet: string,
    readonly name: Nickname,
    readonly category: string,
    readonly buy: boolean,
    readonly quantity: number,
    readonly average: number,
    readonly created: DateString,
    readonly currency: string,
  ) {}

  public valueTotal(): number 
  {
    return this.quantity * this.average;
  }
}
