import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { RetailerinfoService } from './services/retailerinfo.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular/dist/providers/toast-controller';


import { Subject } from 'rxjs/Subject';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  public appPages: any;
  public studentPage = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Store',
      url: '/cuponstore',
      icon: 'cart'
    },
    {
      title: 'QrPay',
      url: '/qr-pay',
      icon: 'basket'
    },
    {
      title: 'Donation',
      url: '/donation',
      icon: 'wallet'
    },
    {
      title: 'Merchant Outlet',
      url: '/merchant-outlet',
      icon: 'map'
    },
    {
      title: 'Notification',
      url: '/list',
      icon: 'notifications'
    }
  ];


  public retailerPage = [
    {
      title: 'Home',
      url: '/retailerhomepage',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Add Coupon',
      url: '/addcupon',
      icon: 'add-circle-outline'

    },
    {
      title: 'Manage Product',
      url: '/productmanagement',
      icon: 'cog'
    },
    {
      title: 'Donation',
      url: '/donation',
      icon: 'wallet'
    },
    {
      title: 'E-wallet Redemtaion',
      url: '/redemtaion',
      icon: 'cash'
    },
    {
      title: 'Notification',
      url: '/list',
      icon: 'notifications'
    }
  ];

  userID: any;
  userauth: Observable<firebase.User>;
  authState: any = null;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userservice: RetailerinfoService,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private fcm: FCM,
    private fcm2: FcmService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
  //
    this.initializeApp();
  }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;
      if (this.userID) {
        this.loadUser();

      }
    });


      }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // fcm

      this.fcm2.getToken();
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        this.presentToast(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });


    });

    this.fcm.getToken().then(token => {
      console.log(token);
    });
  }


  private async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  refrestoken() {
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
  }

  pushnotification() {

  }

  loadUser() {
    this.userservice.getUser(this.userID).subscribe( res => {

      if (res === undefined) {
        this.navCtrl.navigateForward('registerpage');
      } else {
        if (res.usertype === 'Student' || res.usertype === 'Staff' ) {
          this.appPages = this.studentPage;
        } else if (res.usertype === 'Retailer' ) {
          this.appPages = this.retailerPage;
        }
      }

    });
  }
}
