import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Request, RequestService } from '../services/request.service';
import { NavController, ToastController } from '@ionic/angular';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { checkAvailability } from '@ionic-native/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-redemtaion',
  templateUrl: './redemtaion.page.html',
  styleUrls: ['./redemtaion.page.scss'],
})
export class RedemtaionPage implements OnInit {

  request:  Request = {

    amount: null,
    retailerID: '',
    status: 'unapprove',
    date: Date.now(),

   };

   userinfos: Userinfo;
   userId = null;
   userauth: Observable<firebase.User>;
   authState: any = null;
   available: any = null;

  constructor(private authservice: AuthService,
              private navctrl: NavController,
              private afAuth: AngularFireAuth,
              private userservice: RetailerinfoService,
              private toastCtrl: ToastController,
              private gplus: GooglePlus,
              private rwquestservice: RequestService) { }

  ngOnInit() {
    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid;
      if (this.userId) {
        this.loaduser();
      }
    });
  }

  loaduser() {
    this.userservice.getUser(this.userId).subscribe( res => {
      this.userinfos = res;

      this.checkAvailability();

    });

  }

  saveProduct() {

if (this.userinfos.eWallet > 0) {
  this.request.retailerID = this.userId;
     this.request.amount = this.userinfos.eWallet;
    this.rwquestservice.addrequest(this.request).then(() => {

      this. goBack();
    });
} else {
  this.presentToast('insufficient balance');
}

 }

 checkAvailability() {
  this.rwquestservice.getCollectionDonation(this.userId).subscribe( res => {
     if ( res.length > 0 ) {
      this.available = null;
     } else {
      this.available = 'good';
     }


  });
 }

 goBack() {

   this.navctrl.goBack();

 }

 signOut() {
  this.gplus.logout().then(() => {
    this.authservice.signOut();
  });
}


  private async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}
