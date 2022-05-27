import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private clickedCurrency$: BehaviorSubject<string> =
    new BehaviorSubject<string>('USD');

  constructor() {}

  getCurrency() {
    return this.clickedCurrency$.asObservable();
  }

  setCurrency(currency: string) {
    this.clickedCurrency$.next(currency);
  }
}
