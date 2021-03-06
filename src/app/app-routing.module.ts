import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loginpage',
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
  { path: 'qr-pay/:id', loadChildren: './qr-pay/qr-pay.module#QrPayPageModule' },
  { path: 'donation', loadChildren: './donation/donation.module#DonationPageModule' },
  { path: 'merchant-outlet', loadChildren: './merchant-outlet/merchant-outlet.module#MerchantOutletPageModule' },
  { path: 'addcupon', loadChildren: './addcupon/addcupon.module#AddcuponPageModule' },
  { path: 'cuponstore', loadChildren: './cuponstore/cuponstore.module#CuponstorePageModule' },
  { path: 'registerpage', loadChildren: './registerpage/registerpage.module#RegisterpagePageModule' },
  { path: 'loginpage', loadChildren: './loginpage/loginpage.module#LoginpagePageModule' },
  { path: 'studentreg/:id', loadChildren: './studentreg/studentreg.module#StudentregPageModule' },
  { path: 'staffreg', loadChildren: './staffreg/staffreg.module#StaffregPageModule' },
  { path: 'retailerreg', loadChildren: './retailerreg/retailerreg.module#RetailerregPageModule' },
  { path: 'LocationSelect', loadChildren: './location-select/location-select.module#LocationSelectPageModule' },
  { path: 'retailerhomepage', loadChildren: './retailerhomepage/retailerhomepage.module#RetailerhomepagePageModule' },
  { path: 'productmanagement', loadChildren: './productmanagement/productmanagement.module#ProductmanagementPageModule' },
  { path: 'redemtaion', loadChildren: './redemtaion/redemtaion.module#RedemtaionPageModule' },
  { path: 'addproduct', loadChildren: './addproduct/addproduct.module#AddproductPageModule' },
  { path: 'addproduct/:id', loadChildren: './addproduct/addproduct.module#AddproductPageModule' },
  { path: 'viewcupon/:id/:usercoupon', loadChildren: './viewcupon/viewcupon.module#ViewcuponPageModule' },
  { path: 'purchasedetail/:id', loadChildren: './purchasedetail/purchasedetail.module#PurchasedetailPageModule' },
  { path: 'qrscan/:id', loadChildren: './qrscan/qrscan.module#QrscanPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'viewnoti/:id', loadChildren: './viewnoti/viewnoti.module#ViewnotiPageModule' },
  { path: 'watingpage', loadChildren: './watingpage/watingpage.module#WatingpagePageModule' },
  { path: 'cuponstat', loadChildren: './cuponstat/cuponstat.module#CuponstatPageModule' }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
