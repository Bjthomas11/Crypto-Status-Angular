import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) {}

  getCryptos(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
  }

  getPopularCryptos(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    );
  }

  getVisualCryptosData(coin: string, currency: string, days: number) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`
    );
  }

  getCryptoById(coin: string) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coin}`);
  }
}
