import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyInfoComponent } from './currency-info.component';

@NgModule({
  declarations: [
    CurrencyInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [CurrencyInfoComponent]
})
export class CurrencyModule { }
