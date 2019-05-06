import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Transaction, TransactionService } from '../services/transaction.service';
import { ToastController } from '@ionic/angular';
import { AdminaccountService, Transaction2 } from '../services/adminaccount.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

  transaction:  Transaction = {
    icon: '',
    icon2: '',
    title: '',
    amount: 0,
    date: Date.now(),
    color: 'greeen',
    expense:  null,
    month: 0,
    Userid: '',
    retailer: '',

  };

  adminacc:  Transaction2 = {
    icon: 'arrow-down',
    icon2: 'remove',
    title: '',
    amount: 0,
    date: Date.now(),
    expense:  false,
    month: 0,
    username: '',
    retailername: '',
    totalbalance: 0



  };

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
    academicYear: '',
    storeUniqeID: '',
    storetype: '',
    approval: 'unapprove',
    date: Date.now()

   };
   userId = null;
    // for userauth
userauth: Observable<firebase.User>;
authState: any = null;


ADMINID = 'TMFUWOirDNNFlLFmEVSvxlQwiju1';

amounttodonate: any;

  constructor(private authservice: AuthService,
    private userservice: RetailerinfoService,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private transcationservice: TransactionService,
    private toastCtrl: ToastController,
    private adminservice: AdminaccountService, ) { }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid;
      if (this.userId) {
        this.loadTodo();
      }
    });
  }

  signOut() {
  //  this.gplus.logout().then(() => {
      this.authservice.signOut();
  //  });
}

  loadTodo() {
    this.userservice.getUser(this.userId).subscribe( res => {
      this.userinfos = res;

    });
  }




  donate(amount) {

    if (this.userinfos.eWallet >= amount) {
      this.userinfos.eWallet = this.userinfos.eWallet - amount;

      if (this.userId) {
        this.userservice.UpdateUser(this.userinfos, this.userId).then(() => {
          this.Addtransaction(amount, 'You Have Donate to Charity  RM ' + amount);
        });

      }
    } else {
  this.presentToast('insufficient balance');
    }


  }

  Addtransaction(amount: number, title: string) {

    this.transaction.icon = 'arrow-down';
    this.transaction.icon2 = 'remove';
    this.transaction.title = title;
    this.transaction.amount = amount;
    this.transaction.date = Date.now();
    this.transaction.color = 'red';
    this.transaction.expense =  null;
    this.transaction.month = null;
    this.transaction.Userid = this.userId;
    this.transaction.retailer = null;

    if (this.userId) {
      this.transcationservice.addtransaction(this.transaction).then(() => {
        // tslint:disable-next-line:max-line-length
        this.addaccountinfo(this.transaction.amount, this.userinfos.userName + ' Has donate to the Charity for RM ' + this.transaction.amount );
        this.loadTodo();
      });
    } else {

    }
  }

  private async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  addaccountinfo(amount: number, title: any) {
    this.adminacc.title = title;
    this.adminacc.amount = amount;
    this.adminacc.totalbalance = - amount;
    this.adminacc.month = new Date().getMonth();
    this.adminacc.username = this.userinfos.userName;

    this.adminservice.addtransaction(this.adminacc).then(() => {
     // this.LOADADMIN();
    });

  }

  LOADADMIN() {
    this.userservice.getUser(this.ADMINID).subscribe( res => {
      this.userinfos = res;
      this.userinfos.eWallet =  this.userinfos.eWallet - this.transaction.amount;
      this.userservice.UpdateUser(this.userinfos, this.ADMINID).then(() => {} );
    });
  }



}
