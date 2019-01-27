import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { RetailerinfoService } from './services/retailerinfo.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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
      icon: 'list'
    },
    {
      title: 'Store',
      url: '/cuponstore',
      icon: 'list'
    },
    {
      title: 'QrPay',
      url: '/qr-pay',
      icon: 'list'
    },
    {
      title: 'Donation',
      url: '/donation',
      icon: 'list'
    },
    {
      title: 'Merchant Outlet',
      url: '/merchant-outlet',
      icon: 'list'
    },
    {
      title: 'Notification',
      url: '/list',
      icon: 'list'
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
      icon: 'list'
    },
    {
      title: 'Add Coupon',
      url: '/addcupon',
      icon: 'list'
    },
    {
      title: 'Manage Product',
      url: '/productmanagement',
      icon: 'list'
    },
    {
      title: 'Donation',
      url: '/donation',
      icon: 'list'
    },
    {
      title: 'E-wallet Redemtaion',
      url: '/redemtaion',
      icon: 'list'
    },
    {
      title: 'Notification',
      url: '/list',
      icon: 'list'
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
    public navCtrl: NavController
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
    });
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
