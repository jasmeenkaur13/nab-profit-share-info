import { Request, Response } from 'express-serve-static-core';
import { CurrencyDataAnalysis } from '../entities/currency-data-analysis.entity';
import { RequestParameters } from '../entities/request-parameters.entity';
import { ShareDataInfoDb } from './share-data-info.db';
import { Action } from '../enums/action';
import { RequestCurrencyParameters } from '../entities/request-currency-parameters.entity';
import { RequestDateParameters } from '../entities/request-date-parameters.entity';
import { Utilities } from '../Utilities/utilities';
import { Quotes } from '../entities/quotes.entity';

export class ShareInfoDataController {

    /**
     * The method is implemented to calculate the max profit for a currency on a particular date.
     * a. Sort the List by price in descending order.
     * b. for all the data in the list do following step
     *      b.a. fetch the list having less time than the time of the data we choose in step b
     *      b.b. if list has some values then
     *          b.b.a. sort the list by price in ascending order
     *          b.b.b. set the Data choose in step b as max price in the day for the currency
     *          b.b.c. set the first element of the list in step b.b.a as min price of the day for the currency
     *          b.b.d. calculate the profit and return result.
     *      b.c. If list do not have any value, got to step b again.
     * @param shareDataListOfACurrencyOnADate List containg data for a particular currency on a specific date
     */
    private static getCurrencyDataAnalysisforACurrencyAndDate(shareDataListOfACurrencyOnADate: Quotes[]): CurrencyDataAnalysis {
        const shareDataListSortedPrice = Utilities.sortByDescending(shareDataListOfACurrencyOnADate, 'price');
        let shareDataWithSellPrice: Quotes;
        let shareDataWithBuyPrice: Quotes;
        for (const shareDataSorted of shareDataListSortedPrice) {
            const shareDataListWithTiminigsLess = ShareInfoDataController.getFilteredListWithLessTimeThanPassed(shareDataListOfACurrencyOnADate,
                shareDataSorted.time);
            if (shareDataListWithTiminigsLess.length > 0) {
                const shareDataListSortPrice = Utilities.sortByAscending(shareDataListWithTiminigsLess, 'price');
                shareDataWithSellPrice = shareDataSorted;
                shareDataWithBuyPrice = shareDataListSortPrice[0];
                break;
            }
        }
        return CurrencyDataAnalysis.ConvertToModel(shareDataWithBuyPrice, shareDataWithSellPrice);
    }

    /**
     * This method returns the action to be taken according to the parameters recieved from the object 
     * @param requestParamaters parameters recived from request of the API
     */
    private static getActionDetails(requestParamaters: RequestParameters): Action {
        let action: Action = Action.None;
        if (requestParamaters.currency && requestParamaters.date) {
            action = Action.Both;
        } else if (requestParamaters.date) {
            action = Action.Date;
        } else if (requestParamaters.currency) {
            action = Action.Currency;
        }
        return action;
    }

    /**
     * returns the filetered list having less value in time property than the time variable passed.
     * @param list list of objects to be filtered
     * @param time value for the filter
     */
    private static getFilteredListWithLessTimeThanPassed(list: any, time: string) {
        return list.filter((data: any) => data.time < time)
    }

    /**
     * The method returns the list of anaylysis done on data for a paticular currency or date as nly one parameter is passed in.
     * a. Get the data accordin to the request parameter
     * b. for all list recived
    *     b.a. get the data analysis and add it to the list to be returned
     * Above steps are written for currency type only. Please apply the same logic for Date type if passed.
     * @param requestParameters parameters recived from request of the API
     * @param valueType key name of the value to be grouped by
     */
    private static async getCurrencyDataAnalysis(requestParameters: any): Promise<CurrencyDataAnalysis[]> {
        let currencyDataAnalysisRecord: CurrencyDataAnalysis[] = [];
        const shareDataList = await ShareDataInfoDb.getDataWithRequestParameters(requestParameters);
        for (const sharedDataListForADateAndCurrency of shareDataList) {
            const currencyDataAnalysis = ShareInfoDataController.getCurrencyDataAnalysisforACurrencyAndDate(sharedDataListForADateAndCurrency.quotes);
            currencyDataAnalysis.currency = sharedDataListForADateAndCurrency.currency;
            currencyDataAnalysis.date = Utilities.getDateInFormat(sharedDataListForADateAndCurrency.date);
            currencyDataAnalysisRecord.push(currencyDataAnalysis);
        }
        return currencyDataAnalysisRecord;
    }

    /**
     * Generate request parameters according to the type of request recived.
     * @param action determines the type of request
     * @param requestParamaters parameters recived from request of the API
     */
    private static getRequestParameter(action: Action, requestParamaters: RequestParameters) {
        switch (action) {
            case Action.Currency:
                return new RequestCurrencyParameters(requestParamaters.currency);
            case Action.Date:
                return new RequestDateParameters(requestParamaters.date);
            case Action.Both:
                return requestParamaters;
        }
    }

    /**
     * As a part of API the methods is designed to implement GET verb of share-data to return the analysis of profit to be made on spending the money on a
     * particular date, for a currency on the basis of request parameters passed. It performs following operation
     * a. Gathers the request Paramenter
     * b. Identifies the type of action to be taken on the basis of parameters recieved in step a.
     * c. According to the type of action the get the parameters to be send to the request.
     * d. Send data for further analysis.
     * e. Analysed data is returned if there is no exception.
     * f. With exception anywhere in the process, error is returned.
     * @param req Request recieved by API
     * @param res Response to be sent by API
     */
    public static async  getCurrencyDataAnlysis(req: Request, res: Response) {
        const requestParameters = new RequestParameters(req.query.date, req.query.currency);
        let currencyDataAnalysisRecord: CurrencyDataAnalysis[] = [];
        try {
            const action = ShareInfoDataController.getActionDetails(requestParameters);
            const requestParametersAsPerAction = ShareInfoDataController.getRequestParameter(action, requestParameters);
            currencyDataAnalysisRecord = await ShareInfoDataController.getCurrencyDataAnalysis(requestParametersAsPerAction);
            res.status(200).json(currencyDataAnalysisRecord);
    }
    catch(error) {
        res.status(500).send(error);
    }
}
}