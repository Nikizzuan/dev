import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchasedetailPage } from './purchasedetail.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
const routes: Routes = [
  {
    path: '',
    component: PurchasedetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchasedetailPage]
})
export class PurchasedetailPageModule {}
