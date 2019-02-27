

import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { RetailerinfoService, Userinfo } from './retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

// import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class FcmService {


  // for userauth
 userauth: Observable<firebase.User>;
 authState: any = null;
 userId = null;


  constructor(private firebase: Firebase,
              private afs: AngularFirestore,
              private platform: Platform,
              private authservice: AuthService,
              private userservice: RetailerinfoService,
              private afAuth: AngularFireAuth,
              private fcm: FCM,
           //   private afMessaging: AngularFireMessaging,
              private router: Router) {
              }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.fcm.getToken();

    }

    if (this.platform.is('ios')) {
      token = await this.fcm.getToken();
      await this.firebase.grantPermission();
    }


    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) { return; }

    const devicesRef = this.afs.collection('devices');

    // get user email

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid;
      if (this.userId) {
        this.userservice.getUser(this.userId).subscribe( res => {
          const data = {
            token,
            userId: res.email
          };

          return devicesRef.doc(token).set(data);
        });
      }
    });


  }



  refrestoken() {
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
  }



  pushnotification() {
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
        this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log('Received in foreground');
        this.router.navigate([data.landing_page, data.price]);
      }
    });
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }



}
