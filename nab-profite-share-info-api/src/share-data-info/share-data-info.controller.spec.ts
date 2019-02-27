import { ShareInfoDataController } from './share-data-info.controller';
import { ShareDataInfoDb } from './share-data-info.db';
import { ShareData } from '../entities/share-data.entity';
import { Quotes } from '../entities/quotes.entity';

describe('Share data info Controller Unit Test', () => {
    let req: any;
    let res: any;

    beforeEach((done) => {
        res = {
            json: (value: any) => { return; },
            result: null,
            send: () => { return; },
            status: (code: any) => { return; },
            statusCode: null,
        };
        req = {
            params: {},
            query: {},
        };

        spyOn(res, 'status').and.callFake((code: any) => {
            res.statusCode = code;
            return res;
        });
        spyOn(res, 'send');
        spyOn(res, 'json').and.callFake((value: any) => {
            res.result = value;
            return res;
        });
        done();
    });

    afterEach((done) => {
        res = null;
        req = null;
        done();
    });

    it('getCurrencyDataAnlysis to respond with 200 and returns data in correct format', (done) => {
        const currencyData: ShareData = new ShareData();
        const quotes: Quotes[] = [];
        let quote : Quotes = new Quotes();
        quote.time = '1300';
        quote.price = 23.14;
        quotes.push(quote);
        quote = new Quotes();
        quote.time = '1700';
        quote.price = 28.10;
        quotes.push(quote);
        currencyData.currency='BTC';
        currencyData.date = '20180708';
        currencyData.quotes= quotes;
        spyOn(ShareDataInfoDb, 'getDataWithRequestParameters').and.returnValue([currencyData]);
        req.query.currency = 'BTC';
        req.query.date = '20180708';

        ShareInfoDataController.getCurrencyDataAnlysis(req, res)
            .then((result) => {
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
                expect(res.result[0].buyPrice).toBe('$23.14');
                done();
            }, (reject) => {
                expect(false).toBe(true);
                done();
            });
    });

    it('getCurrencyDataAnlysis to respond with 200 and returns data in correct format when only currency passed', (done) => {
        const currencyData: ShareData = new ShareData();
        const quotes: Quotes[] = [];
        let quote : Quotes = new Quotes();
        quote.time = '1300';
        quote.price = 23.14;
        quotes.push(quote);
        quote = new Quotes();
        quote.time = '1700';
        quote.price = 28.10;
        quotes.push(quote);
        currencyData.currency='BTC';
        currencyData.date = '20180708';
        currencyData.quotes= quotes;
        spyOn(ShareDataInfoDb, 'getDataWithRequestParameters').and.returnValue([currencyData]);
        req.query.currency = 'BTC';

        ShareInfoDataController.getCurrencyDataAnlysis(req, res)
            .then((result) => {
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
                expect(res.result[0].buyPrice).toBe('$23.14');
                done();
            }, (reject) => {
                expect(false).toBe(true);
                done();
            });
    });

    it('getCurrencyDataAnlysis to respond with 200 and returns data in correct format when only date passed', (done) => {
        const currencyData: ShareData = new ShareData();
        const quotes: Quotes[] = [];
        let quote : Quotes = new Quotes();
        quote.time = '1300';
        quote.price = 23.14;
        quotes.push(quote);
        quote = new Quotes();
        quote.time = '1700';
        quote.price = 28.10;
        quotes.push(quote);
        quote = new Quotes();
        quote.time = '1400';
        quote.price = 22.10;
        quotes.push(quote);
        quote = new Quotes();
        quote.time = '1100';
        quote.price = 21.10;
        quotes.push(quote);
        currencyData.currency='BTC';
        currencyData.date = '20180708';
        currencyData.quotes= quotes;
        spyOn(ShareDataInfoDb, 'getDataWithRequestParameters').and.returnValue([currencyData]);
        req.query.date = '20180705';

        ShareInfoDataController.getCurrencyDataAnlysis(req, res)
            .then((result) => {
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
                expect(res.result[0].buyPrice).toEqual('$21.10');
                done();
            }, (reject) => {
                expect(false).toBe(true);
                done();
            });
    });

    it('getCurrencyDataAnlysis to respond with 500 when error occurs', (done) => {
        spyOn(ShareDataInfoDb, 'getDataWithRequestParameters').and.returnValue(()=>{throw new Error('dummyError')});
        req.query.date = '20180705';

        ShareInfoDataController.getCurrencyDataAnlysis(req, res)
            .then((result) => {
                expect(res.status).toHaveBeenCalledWith(500);
                done();
            }, (reject) => {
                expect(false).toBe(true);
                done();
            });
    });

});
