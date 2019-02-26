import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { AppConfig } from '../app-config';
import { CurrencyDataAnalysis } from '../models/currency-data-analysis.model';

@Injectable({
    providedIn: 'root'
})
export class CurrencyDataAnalysisService {

    constructor(private http: HttpClient) { }

    private baseURL = AppConfig.baseUrlShareData;

    getcurrencyAnalysiData(currency: string, date: string) {
        let url: string = this.baseURL+ AppConfig.baseUrlShareDataCurrencyPart + currency + AppConfig.baseUrlShareDataDatePart + date;
        return this.http.get<CurrencyDataAnalysis[]>(url);
    }
}