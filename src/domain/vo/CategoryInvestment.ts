enum Category {
  STOCK_EUA = "STOCK EUA",
  STOCK_EUR = "STOCK EUR",
  STOCK_BRL = "STOCK BRL",
  ETF_EUA = "ETF EUA",
  ETF_EUR = "ETF EUR",
  ETF_BRL = "ETF BRL",
  FIIS = "FIIS",
  REIT = "REIT",
}

export class CategoryInvestment {
  private value: Category;

  constructor(value: string) {
    if (!Object.values(Category).includes(value as Category)) {
      throw new Error("Category doesn't exist");
    }
    this.value = value as Category;
  }
}
