import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { TestBed } from '@angular/core/testing';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {


  user: Observable<firebase.User>;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private gplus: GooglePlus,
        private platform: Platform,
        // private db: AngularFireDatabase,
        private router: Router
  ) {
    this.user = this.afAuth.authState;
    // this.user = this.afAuth.authState;

/*
      this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
       });
   this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    ); */
    this.afAuth.auth.onAuthStateChanged(user =>  {

      this.authState = user;

    });

   }

   ngOnInit() {

    this.afAuth.auth.onAuthStateChanged(user =>  {

      this.authState = user;

    });


  }


   /* async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  } */

/*  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      matricNum: user.matricNum,
      userType: user.userType,
      universiti: user.universiti,
    };

    return userRef.set( data, { merge: true });

  }*/

  async signOut() {
    await this.afAuth.auth.signOut();
    // this.router.navigate(['/']);
  }

  get authenticated(): boolean {

    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  get currentUserEmail(): string {
    return this.authenticated ? this.authState.email : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    // tslint:disable-next-line:max-line-length
    if (!this.authState) { return 'Guest'; } else if (this.currentUserAnonymous) { return 'Anonymous'; } else { return this.authState['displayName'] || 'User without a Name'; }
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

   webGoogleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = this.afAuth.auth.signInWithPopup(provider);

    } catch (err) {
      console.log(err);
    }
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return this.socialSignIn(provider);

  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user;
         // this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user;
    //  this.updateUserData();
    })
    .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      //  this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user;
       //  this.updateUserData();
       })
       .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password


  //// Sign Out ////

  //// Helpers ////

 /* private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
                  email: this.authState.email,
                  name: this.authState.displayName
                };
 this.afs.doc(`users/${user.uid}`)
    this.db.object(path).update(data)
    .catch(error => console.log(error));

  }
*/
}

function newFunction(gplusUser: any): void | PromiseLike<void> {
  return  this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
}

