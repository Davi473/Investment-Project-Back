import { Nickname } from "../vo/Nickname";
import { DateString } from "../vo/DateString";
import { CategoryInvestment } from "../vo/CategoryInvestment";

export class Investment 
{
  private readonly name: Nickname;
  private readonly category: CategoryInvestment;
  
  constructor(
    readonly id: string,
    readonly idWallet: string,
    name: string,
    category: string,
    readonly buy: boolean,
    readonly quantity: number,
    readonly average: number,
    readonly created: DateString,
    readonly currency: string,
  ) {
    this.name = new Nickname(name);
    this.category = new CategoryInvestment(category);
  }

  public valueTotal(): number 
  {
    return this.quantity * this.average;
  }
}
