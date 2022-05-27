import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoDetailComponent } from './crypto-detail/crypto-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'cryptos', pathMatch: 'full' },
  { path: 'cryptos', component: HomeComponent },
  { path: 'cypto-detail/:id', component: CryptoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
