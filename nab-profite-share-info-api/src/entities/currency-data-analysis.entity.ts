import { ShareData } from './share-data.entity';
import { Quotes } from './quotes.entity';

/**
 * Class to represent the result to be returned as per the user expectation and requirement for the profit data analysis.
 */
export class CurrencyDataAnalysis{
    public date: string;
    public buyTime: string;
    public sellTime: string;
    public currency: string;
    public buyPrice: number;
    public sellPrice: number;
    public profit: number;

    public static ConvertToModel(buyData: Quotes, sellData: Quotes): CurrencyDataAnalysis
    {
        let dataAnalysed: CurrencyDataAnalysis = new CurrencyDataAnalysis();
        dataAnalysed.buyPrice = buyData.price;
        dataAnalysed.buyTime = buyData.time;
        dataAnalysed.sellPrice = sellData.price;
        dataAnalysed.sellTime = sellData.time;
        dataAnalysed.profit = Number((sellData.price - buyData.price).toFixed(2));
        return dataAnalysed;
    }
}