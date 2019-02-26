import { Quotes } from './quotes.entity';

/**
 * Class to represent the entity of the historical data stored in back end
 */
export class ShareData{
    public date: string;
    public currency: string;
    public quotes: Quotes[];

    constructor()
    {
        this.quotes = [];
    }

    public static ConvertToModel(document: any): ShareData
    {
        let dataRecieved: ShareData = new ShareData();
        dataRecieved.currency = document.currency;
        dataRecieved.date = document.date;
        for(const quote of document.quotes){
            const quotePassed: Quotes = new Quotes();
            quotePassed.price = quote.price;
            quotePassed.time = quote.time;
            dataRecieved.quotes.push(quotePassed);
        }
        return dataRecieved;
    }
}