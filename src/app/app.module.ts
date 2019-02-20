import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { CommonModule } from '@angular/common';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { MapslocaterComponent } from './mapslocater/mapslocater.component';
import { Network } from '@ionic-native/network';
import { ConnectivityServiceService } from '../app/services/connectivity-service.service';
import { GoogleMapsService } from '../app/services/google-maps.service';
import { LocationSelectPageModule } from '../app/location-select/location-select.module';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';


@NgModule({
  declarations: [AppComponent, MapslocaterComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicModule,
    AppRoutingModule,
    CommonModule,
    // LocationSelectPageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],

  providers: [
    StatusBar,
    Geolocation,
    Camera,
    File,
    DatePicker,
    Firebase,
  // Network,
   // ConnectivityServiceService,
 //   GoogleMapsService,
    NativeGeocoder,
    GooglePlus,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
