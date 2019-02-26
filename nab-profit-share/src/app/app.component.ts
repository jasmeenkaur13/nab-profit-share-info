import { Component } from '@angular/core';
import { CurrencyDataAnalysisService } from '../services/currency-analysis.service';
import { Observable } from 'rxjs';
import { CurrencyDataAnalysis } from '../models/currency-data-analysis.model';

/**
 * Class to interact with the component <currency-information> used anywhere in the application
 */
@Component({
  selector: 'currency-information',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currencyDataAnaysisList: Observable<CurrencyDataAnalysis[]> ;
  public currency: string ='';
  public date: string ='';

  constructor(private currencyDataAnalysisService: CurrencyDataAnalysisService) { }
  title = 'Profit sharing analysis screen';

  /**
   * calls the service ans retrives the data to set an Observable Object
   */
  getCurrencyAnalysis() {
    this.currencyDataAnaysisList = this.currencyDataAnalysisService.getcurrencyAnalysiData(this.currency, this.date);
  }

  showNorecordfound(){
    return this.currencyDataAnaysisList && this.currencyDataAnaysisList;
  }
  /**
   * set the variable so that value from UI can be maintained
   * @param value value changed on UI
   */
  updateCurrency(value: string){
    this.currency = value;
  }

  /**
   * set the variable so that value from UI can be maintained
   * @param value value changed on UI
   */
  updateDate(value: string){
    this.date = value;
  }
}
