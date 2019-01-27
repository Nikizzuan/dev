import { Component, OnInit } from '@angular/core';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-studentreg',
  templateUrl: './studentreg.page.html',
  styleUrls: ['./studentreg.page.scss'],
})
export class StudentregPage implements OnInit {

  user: Userinfo = {
    userName: '',
    matricNum: '123456',
    email: 'example@Student.usm.my',
    usertype: 'Student',
    storeAdress: 'null',
    storeName: '',
    University: 'Universiti Sains Malaysia',
    UniversirtyPoint: 0,
    myeventplaner: 'null',
    myqrplaner: 'true',
    StoreLocid: '',
    eWallet: 0,
    academicYear: '1'
};

tabsinfo: any;
userID: any;
userauth: Observable<firebase.User>;
authState: any = null;

  constructor(private userservice: RetailerinfoService, private route: ActivatedRoute, private authservice: AuthService,
    private afAuth: AngularFireAuth, public navCtrl: NavController) {
      this.tabsinfo = null; }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;
      if (this.userID) {
    //    this.loadUser();
      }
    });


  }

  loadUser() {
    this.userservice.getUser(this.userID).subscribe( res => {
      this.user = res;
    });
  }


  saveUser() {
   // this.user.email = this.authservice.currentUserEmail;
    this.userservice.addUser(this.user).then(() => {
    });
    this.navCtrl.navigateForward('home');
    /* if (this.userID) {
      this.userservice.UpdateUser(this.user, this.userID).then(() => {
      });
    } else {

       this.userservice.addUser(this.user).then(() => {
       });
    }
    */
  }

  Nextface() {
    this.user.email = this.authservice.currentUserEmail;
    console.log(this.authservice.currentUserEmail);
    this. tabsinfo = 1;
  }


}
