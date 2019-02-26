
/**
 * Class to represent the structure of the parameted recived in the request
 */
export class RequestParameters {
    public date: string;
    public currency: string;

    constructor(date: string, currency: string) {
        this.date = date;
        this.currency = currency;
    }
}