import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RetailerhomepagePage } from './retailerhomepage.page';

const routes: Routes = [
  {
    path: '',
    component: RetailerhomepagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RetailerhomepagePage]
})
export class RetailerhomepagePageModule {}
