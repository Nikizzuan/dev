import { Component, OnInit } from '@angular/core';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FcmService } from '../services/fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-studentreg',
  templateUrl: './studentreg.page.html',
  styleUrls: ['./studentreg.page.scss'],
})
export class StudentregPage implements OnInit {

  user: Userinfo = {
    userName: '',
    matricNum: '',
    email: '',
    usertype: 'Student',
    storeAdress: '',
    storeName: '',
    University: 'Universiti Sains Malaysia',
    UniversirtyPoint: 0,
    myeventplaner: '',
    myqrplaner: 'true',
    StoreLocid: '',
    eWallet: 0,
    academicYear: '',
    storeUniqeID: '',
    storetype: '',
    approval: 'approve',
    date: Date.now()
};

tabsinfo: any;
userID: any;
userauth: Observable<firebase.User>;
authState: any = null;
error: any =  null;
error2: any =  null;
Userstat: any;

  constructor(private userservice: RetailerinfoService, private route: ActivatedRoute, private authservice: AuthService,
    private afAuth: AngularFireAuth, public navCtrl: NavController,
    private fcm2: FcmService, private fcm: FCM) {
      this.tabsinfo = null; }

  ngOnInit() {

    this.Userstat = this.route.snapshot.params['id'];

    if (this.Userstat === 'Student') {
      this.user.usertype =   'Student';
    } else {
      this.user.usertype =   'Staff';

    }

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;

    });


  }

  loadUser() {
    this.userservice.getUser(this.userID).subscribe( res => {
      this.user = res;
    });
  }


    saveUser() {
    // this.user.email = this.authservice.currentUserEmail;
        console.log(this.user.matricNum.toString().length);
        if (this.user.matricNum.toString().length === 6) {
          this.error2 = null;
        } else {
          this.error2 = 'Please enter a valid matric number.';
        }

        if (this.user.email.includes('@usm.my')) {
          this.error = null;

        } else if (this.user.email.includes('@student.usm.my')) {
          this.error = null;

        } else {

          this.error = 'Please enter a valid email.';
        }


         if (this.error === null &&  this.error2 === null ) {
          this.userservice.addUser(this.user).then(() => {

            this.fcm2.getToken();

            if (this.Userstat === 'Student') {
              this.fcm.subscribeToTopic('All');
              this.fcm.subscribeToTopic('Student');
              this.fcm.unsubscribeFromTopic('Retailer');
              this.fcm.unsubscribeFromTopic('Staff');

            } else {

              this.fcm.subscribeToTopic('All');
              this.fcm.unsubscribeFromTopic('Student');
              this.fcm.unsubscribeFromTopic('Retailer');
              this.fcm.subscribeToTopic('Staff');
            }
            this.navCtrl.navigateForward('home');
          });
         }


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
