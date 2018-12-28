import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MerchantOutletPage } from './merchant-outlet.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantOutletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MerchantOutletPage]
})
export class MerchantOutletPageModule {}
