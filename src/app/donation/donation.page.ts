import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

  userinfos: Userinfo = {
    userName: '',
    matricNum: '',
    email: '',
    usertype: '',
    storeAdress: '',
    storeName: '',
    University: '',
    UniversirtyPoint: 0,
    myeventplaner: '',
    myqrplaner: '',
    StoreLocid: '',
    eWallet: 0,
    academicYear: ''
   }
   userId = null;
    // for userauth
userauth: Observable<firebase.User>;
authState: any = null;

  constructor(private authservice: AuthService,
    private userservice: RetailerinfoService,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid
      if (this.userId) {
        this.loadTodo();
      }
    });
  }

  signOut() {
    this.authservice.signOut();
  }

  loadTodo() {
    this.userservice.getUser(this.userId).subscribe( res => {
      this.userinfos = res;
    
    });
  }
}
