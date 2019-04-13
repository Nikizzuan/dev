import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [ GooglemapsComponent, GoogleLoginComponent],
  exports: [ GooglemapsComponent, GoogleLoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgxQRCodeModule
  ]
})
export class ComponentsModule { }
