import { AppConfig } from '../app-config';
var format = require('moment');


var convertTime = require('convert-time');

export class Utilities {
    /**
     * sorts the list in descending order
     * @param list list to be sorted
     * @param key property to be sorted by
     */
    public static sortByDescending(list: any, key: any) {
        return list.sort((data1: any, data2: any) => {
            return data2[key] - data1[key];
        });
    }

    /**
     * sorts the list in ascending order
     * @param list list to be sorted
     * @param key property to be sorted by
     */
    public static sortByAscending(list: any, key: any) {
        return list.sort((data1: any, data2: any) => {
            return data1[key] - data2[key];
        });
    }

    /**
     * Inserts the addString to toString at index position
     * @param index position to be inserted at
     * @param toString the string to be changed and get the new instertion
     * @param addString the string to be inserted
     */
    public static insertAt(index: any, toString: any, addString: any) {
        return toString.substr(0, index) + addString + toString.substr(index);
    }

    /**
     * returns time in proper format
     * @param time time to be converted in proper format
     */
    public static getTimeInFormat(time: string) {
        const timeFormatted = Utilities.insertAt(AppConfig.timeIndexPostion, time, AppConfig.timeDelimeter);
        return convertTime(timeFormatted, AppConfig.timeFormat);
    }

    /**
     * returns price in proper format
     * @param price price to be converted in proper format
     */
    public static getPriceInFormat(price: number) {
        return new Intl.NumberFormat(AppConfig.currencyOrigin, { style: AppConfig.currencystyle, currency: AppConfig.currencytype }).format(price);
    }

    /**
   * returns date in proper format
   * @param date date to be converted in proper format
   */
    public static getDateInFormat(date: string) {
        const dateParsed = format(date, AppConfig.dateReadFormat).format(AppConfig.dateSetFormat);
        return dateParsed;
    }


}