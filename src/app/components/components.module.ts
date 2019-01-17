import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ GoogleLoginComponent],
  exports: [ GoogleLoginComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
