import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { RetailerinfoService } from '../services/retailerinfo.service';
import { ToastController } from '@ionic/angular/dist/providers/toast-controller';
@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent {

  user: Observable<firebase.User>;
  userID: any;
  userauth: Observable<firebase.User>;
  authState: any = null;
  constructor(private afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform,
              private authservice: AuthService,
              public navCtrl: NavController,
              private userservice: RetailerinfoService,
              private toastCtrl: ToastController) {

    this.user = authservice.currentUserObservable;


  }

  googleLogin() {

    if (this.platform.is('cordova')) {
      this. googleLogin2();


    } else {
      this.webGoogleLogin();
      this.userauth = this.afAuth.authState;

      this.afAuth.auth.onAuthStateChanged(user =>  {
       this.userID = user.uid;
        if (this.userID) {


          this.loadUser();

        }
      });
    }

  }



  async nativeGoogleLogin(): Promise<void> {
    try {

      const gplusUser = await this.gplus.login({
        'webClientId': 'AIzaSyCC8Z7uxZy1-pVtq6tJlRt6nNY71zpkWoc',
        'offline': true,
        'scopes': 'profile email'
      });

      // return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));

    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

    } catch (err) {
      console.log(err);
    }
  }

  async googleLogin2() {
    try {
      this.gplus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        // tslint:disable-next-line:max-line-length
        'webClientId': '415399973733-irn706ik5f6ddapnv8sfk48f5tbcn1e1.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        // tslint:disable-next-line:max-line-length
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      }).then(user => {


          this.afAuth.auth.signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken));
          this.userauth = this.afAuth.authState;
          this.afAuth.auth.onAuthStateChanged(authtest =>  {
            this.userID = authtest.uid;
          });
          if (this.userID) {
            this.loadUser();
          }

        });

    } catch (err) {
      console.log(err);
    }
  }


  loadUser() {
    this.userservice.getUser(this.userID).subscribe( res => {


      if (res === undefined) {
        this.presentToast('hai!! New User');
        this.navCtrl.navigateForward('registerpage');
      } else if (res.usertype === 'Retailer') {
        this.presentToast('Welcome back ' + res.userName);
        this.navCtrl.navigateForward('retailerhomepage');
      } else {
        this.presentToast('Welcome back ' + res.userName);
        this.navCtrl.navigateForward('home');
      }
    });
}

private async presentToast(message) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 3000
  });
  toast.present();
}

  signOut() {
    this.authservice.signOut();
  }

}

 function newFunction(gplusUser: any): void | PromiseLike<void> {
  return  this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
}

