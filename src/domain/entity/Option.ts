export default class Option {
    private currentPrice: number = 0;

    constructor(
        public id: string,
        public idWallet: string,
        public asset: string,
        public rate: number,
        public type: string, // call / put
        public strikePrice: number
    ) {}

    public setCurrentPrice(value: number): void {
        this.currentPrice = value;
    }

    public getProfit() {
        if (this.type === "call") {
            const value = this.strikePrice + this.rate;
            console.log(value);
            return { 
                value: this.currentPrice - value, 
                percentual: ((this.currentPrice * 100) / value) - 100
            };
        }
        if (this.type === "put") {

        }
    }
}