import { ShareDataInfoDb } from './share-data-info.db';

describe('Facility Service DB Unit Tests', () => {
    beforeEach((done) => {
        done();
    });

    afterEach((done) => {
        done();
    });

    it('getDataWithRequestParameters Test Success', (done) => {
        ShareDataInfoDb.getDataWithRequestParameters({currency:'BTC'}).then((result) => {
           expect(result[0].currency).toEqual('BTC');
            done();
        }, (reason) => {
            expect(false).toBe(true);
            done();
        });
    });

    it('getDataWithRequestParameters Test Success', (done) => {
        ShareDataInfoDb.getDataWithRequestParameters({date:'20180507'}).then((result) => {
           expect(result[0].date).toEqual('20180507');
            done();
        }, (reason) => {
            expect(false).toBe(true);
            done();
        });
    });
});
