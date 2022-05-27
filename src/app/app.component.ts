import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  clickedCurrency: string = 'USD';

  constructor(private currencyService: CurrencyService) {}

  updateCurrency(ev: string) {
    // console.log(ev);
    this.currencyService.setCurrency(ev);
  }
}
