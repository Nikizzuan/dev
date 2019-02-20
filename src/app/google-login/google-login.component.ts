import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { RetailerinfoService } from '../services/retailerinfo.service';
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
              private userservice: RetailerinfoService) {

    this.user = authservice.currentUserObservable;


  }

  googleLogin() {

    if (this.platform.is('cordova')) {
/*
      this.userauth = this.afAuth.authState;

      this.afAuth.auth.onAuthStateChanged(user =>  {

          this.userID = user.uid;
        if (this.userID) {
          this.loadUser();

        }
      });
       */


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
        'webClientId': 'your-webClientId-XYZ.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      return await newFunction(gplusUser);

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

  async googleLogin2(): Promise<void> {
    try {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await this.afAuth.auth.signInWithPopup(provider)
    .then((credential) =>  {
      this.authState = credential.user;
      this.loadUser();
     // this.updateUserData();
  });

    } catch (err) {
      console.log(err);
    }
  }


  loadUser() {
    this.userservice.getUser(this.userID).subscribe( res => {


      if (res === undefined) {
        this.navCtrl.navigateForward('registerpage');
      }
    });
}

  signOut() {
    this.authservice.signOut();
  }

}

 function newFunction(gplusUser: any): void | PromiseLike<void> {
  return  this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
}

