import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginpagePage } from './loginpage.page';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import { AppModule } from '../app.module';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: LoginpagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginpagePage]
})
export class LoginpagePageModule {}
