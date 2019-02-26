import { Quotes } from './quotes.entity';
import { Utilities } from '../Utilities/utilities';

/**
 * Class to represent the result to be returned as per the user expectation and requirement for the profit data analysis.
 */
export class CurrencyDataAnalysis {
    public date: string;
    public buyTime: string;
    public sellTime: string;
    public currency: string;
    public buyPrice: string;
    public sellPrice: string;
    public profit: string;

    public static ConvertToModel(buyData: Quotes, sellData: Quotes): CurrencyDataAnalysis {
        let dataAnalysed: CurrencyDataAnalysis = new CurrencyDataAnalysis();
        dataAnalysed.buyPrice = Utilities.getPriceInFormat(buyData.price);
        dataAnalysed.buyTime = Utilities.getTimeInFormat(buyData.time);
        dataAnalysed.sellPrice = Utilities.getPriceInFormat(sellData.price);
        dataAnalysed.sellTime = Utilities.getTimeInFormat(sellData.time);
        dataAnalysed.profit = Utilities.getPriceInFormat(Number((sellData.price - buyData.price).toFixed(2)));
        return dataAnalysed;
    }

    
}