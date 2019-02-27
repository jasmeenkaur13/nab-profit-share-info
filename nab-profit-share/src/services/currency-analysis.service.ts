import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { AppConfig } from '../app-config';
import { CurrencyDataAnalysis } from '../models/currency-data-analysis.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyDataAnalysisService {

    constructor(private http: HttpClient) { }

    private baseURL = AppConfig.baseUrlShareData;

    /**
     * return the list of observable object of currency data analysis
     * @param currency crrency to be filtered
     * @param date date to be filtered
     */
    getcurrencyAnalysiData(currency: string, date: string): Observable<CurrencyDataAnalysis[]> {
        let url: string = this.baseURL+ AppConfig.baseUrlShareDataCurrencyPart + currency + AppConfig.baseUrlShareDataDatePart + date;
        return this.http.get<CurrencyDataAnalysis[]>(url);
    }
}