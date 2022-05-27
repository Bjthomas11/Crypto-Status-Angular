import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../services/crypto.service';
import { CurrencyService } from '../services/currency.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.scss'],
})
export class CryptoDetailComponent implements OnInit {
  coin: any;
  coinId: any;
  days: number = 30;
  currency: string = 'USD';

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  constructor(
    private cryptoApi: CryptoService,
    private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.coinId = val['id'];
    });
    this.getCoin();
    this.getVisualData(this.days);
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getVisualData(this.days);
      this.getCoin();
    });
  }

  getCoin() {
    this.cryptoApi.getCryptoById(this.coinId).subscribe((data) => {
      // console.log(data);
      if (this.currency === 'USD') {
        data.market_data.current_price.usd = data.market_data.current_price.usd;
        data.market_data.market_cap.usd = data.market_data.market_cap.usd;
      }
      data.market_data.current_price.eur = data.market_data.current_price.eur;
      data.market_data.market_cap.eur = data.market_data.market_cap.eur;
      this.coin = data;
    });
  }

  getVisualData(days: number) {
    this.days = days;
    this.cryptoApi
      .getVisualCryptosData(this.coinId, this.currency, this.days)
      .subscribe((data) => {
        // console.log(data);
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = data.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = data.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
      });
  }
}
