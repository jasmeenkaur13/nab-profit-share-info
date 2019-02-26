import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyDataAnalysisService } from '../services/currency-analysis.service';

/**
 * Mock the service
 */
class MockCurrencyDataAnalysisService {
  getcurrencyAnalysiData() {
    return 'test text';
  } 
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: CurrencyDataAnalysisService, useClass: MockCurrencyDataAnalysisService }
      ],
      imports: [
        HttpClientModule
    ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.get(CurrencyDataAnalysisService);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have as title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toMatch('Profit sharing analysis screen');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toMatch(' Welcome to Profit sharing analysis screen! ');
  }));

  it('should set currency', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.updateCurrency('hi');
    expect(app.currency).toMatch('hi');
  }));

  it('should set date', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.updateDate('hi');
    expect(app.date).toMatch('hi');
  }));

  it('should set the object returned by the service', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.getCurrencyAnalysis();
    expect(app.currencyDataAnaysisList).toMatch('test text');
  }));
});
