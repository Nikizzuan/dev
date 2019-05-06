import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RetailerregPage } from './retailerreg.page';

import { LocationSelectPage } from '../location-select/location-select.page';
import { NgxErrorsModule } from '@ultimate/ngxerrors';


const routes: Routes = [
  {
    path: '',
    component: RetailerregPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxErrorsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RetailerregPage]
})
export class RetailerregPageModule {}
