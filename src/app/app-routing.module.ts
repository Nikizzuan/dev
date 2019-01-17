import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
     path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'qr-pay', loadChildren: './qr-pay/qr-pay.module#QrPayPageModule' },
  { path: 'donation', loadChildren: './donation/donation.module#DonationPageModule' },
  { path: 'merchant-outlet', loadChildren: './merchant-outlet/merchant-outlet.module#MerchantOutletPageModule' },
  { path: 'addcupon', loadChildren: './addcupon/addcupon.module#AddcuponPageModule' },
  { path: 'cuponstore', loadChildren: './cuponstore/cuponstore.module#CuponstorePageModule' },
  { path: 'registerpage', loadChildren: './registerpage/registerpage.module#RegisterpagePageModule' },
  { path: 'loginpage', loadChildren: './loginpage/loginpage.module#LoginpagePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
