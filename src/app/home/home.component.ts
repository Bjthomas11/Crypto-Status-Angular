import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CryptoService } from '../services/crypto.service';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cryptos: any[] = [];
  currency: string = 'USD';
  visualColumns: string[] = [
    'symbol',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private cryptoApi: CryptoService,
    private router: Router,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.getAllCrypto();
    this.getTrendingCryptos();
    this.getCurrency();
  }

  getTrendingCryptos() {
    this.cryptoApi.getPopularCryptos(this.currency).subscribe((data) => {
      // console.log(data);
      this.cryptos = data;
    });
  }

  getAllCrypto() {
    this.cryptoApi.getCryptos(this.currency).subscribe((data) => {
      // console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe((currency) => {
      this.currency = currency;
      // console.log(this.currency);
      this.getAllCrypto();
      this.getTrendingCryptos();
    });
  }

  filterCoin(ev: Event) {
    const filiteredValue = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filiteredValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToCoinDetail(coin: any) {
    this.router.navigate(['/cypto-detail', coin.id]);
  }
}
