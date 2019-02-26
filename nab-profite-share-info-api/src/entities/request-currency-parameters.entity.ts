
/**
 * Class to represent the structure of the parameted recived in the request
 */
export class RequestCurrencyParameters {
    public currency: string;

    constructor(currency: string) {
        this.currency = currency;
    }
}