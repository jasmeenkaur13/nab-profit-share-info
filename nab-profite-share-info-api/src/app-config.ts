/**
 * Class to represent the configurable values.
 */
export class AppConfig {
    public static readonly databaseURL = 'mongodb://localhost/';
    public static readonly databaseName = 'nab-profit-info';
    public static readonly shareDataInfoCollectionName = 'share-data';
    public static readonly currencyOrigin = 'en-US';
    public static readonly currencystyle = 'currency';
    public static readonly currencytype = 'USD';
    public static readonly timeIndexPostion = 2;
    public static readonly timeDelimeter = ':';
    public static readonly timeFormat = 'hh:MM A';
    public static readonly dateReadFormat = 'YYYYMMDD';
    public static readonly dateSetFormat = 'DD-MMM-YY';
}