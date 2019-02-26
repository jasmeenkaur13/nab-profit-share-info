import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { CurrencyDataAnalysisService } from './currency-analysis.service';
import { AppConfig } from '../app-config';
import { CurrencyDataAnalysis } from '../models/currency-data-analysis.model';

describe('DataService', () => {
    let injector;
    let service: CurrencyDataAnalysisService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CurrencyDataAnalysisService]
            , imports: [HttpClientTestingModule],
        });
        injector = getTestBed();
        service = injector.get(CurrencyDataAnalysisService);
        httpMock = injector.get(HttpTestingController);
    });

    it('should be created', inject([CurrencyDataAnalysisService], (service: CurrencyDataAnalysisService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the list', () => {
        const dummyList: CurrencyDataAnalysis[] = [];

        service.getcurrencyAnalysiData('', '').subscribe(list => {
            expect(list).toEqual(dummyList);
        });

        const req = httpMock.expectOne(AppConfig.baseUrlShareData + AppConfig.baseUrlShareDataCurrencyPart + AppConfig.baseUrlShareDataDatePart);
        expect(req.request.method).toBe('GET');
        req.flush(dummyList);
    });

    it('should return the list with correct url', () => {
        const dummyList: CurrencyDataAnalysis[] = [];;
        const currency = 'BTC';
        const date = '20180708';

        service.getcurrencyAnalysiData(currency, date).subscribe(list => {
            expect(list).toEqual(dummyList);
        });

        const req = httpMock.expectOne(AppConfig.baseUrlShareData + AppConfig.baseUrlShareDataCurrencyPart + currency + AppConfig.baseUrlShareDataDatePart + date);
        expect(req.request.method).toBe('GET');
        req.flush(dummyList);
    });
});