import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {


  user: Userinfo = {
    userName: 'Your name',
    matricNum: '123456',
    email: 'example@email.com',
    usertype: 'user type',
    storeAdress: 'USM',
    storeName: '',
    University: 'Universiti Sains Malaysia',
    UniversirtyPoint: 0,
    myeventplaner: 'null',
    myqrplaner: 'null',
    StoreLocid: '',
    eWallet: 0,
    academicYear: ''
};

userID: any;
// modal: any;
userauth: Observable<firebase.User>;
authState: any = null;

isStudent: any = null;
isRetailer: any = null;



  constructor( private authservice: AuthService, private afAuth: AngularFireAuth, private userservice: RetailerinfoService) { }

   ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;
      if (this.userID) {
        this.loadUser();
      }
    });

  }

  loadUser() {
    this.userservice.getUser(this.userID).subscribe( res => {
      this.user = res;

      if (this.user.usertype === 'Student' || this.user.usertype === 'Staff') {
        this.isStudent = 1;
      } else if (this.user.usertype === 'Retailer' ) {

        this.isRetailer = 1;
      }
    });
  }


  signOut() {
    this.authservice.signOut();
  }

}
