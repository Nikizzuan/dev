import { Component, OnInit } from '@angular/core';
import { QRrequestService, Qrdata } from '../services/qrrequest.service';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TodoService, Todo } from '../services/todo.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ToastController } from '@ionic/angular';


// import * as admin from 'firebase-admin';


@Component({
  selector: 'app-qr-pay',
  templateUrl: './qr-pay.page.html',
  styleUrls: ['./qr-pay.page.scss'],
})
export class QrPayPage implements OnInit {

  voucherID: any;

   qrdata: Qrdata = {
    CustomerEmail: '',
    RetailerEmail: '',
    BillDue: 0,
    QrStatus: 'Request',
    CustomerName: '',
    QrCode: null,
    RequestID: '',
    VoucherID: '',
    retailerID: ''
   };
   comboxarray: Userinfo[];

   Retialer: any;

   todo: Todo = {
    CuponName: 'Test cuppon',
    Expiredate: '',
    CreatedAt: new Date().getTime(),
    Retailer: '',
    CupponType: '',
    Amountalocate: 0,
    CupponNum: 0,
    ItemList: '',
    discount: 0,
    Term: '',
    usersCouponID: [],
    expire: 'false'
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
  balance: any;

  constructor(private qrrequest: QRrequestService,
    private usersevice: RetailerinfoService,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private todoService: TodoService,
    private authservice: AuthService) { }

  ngOnInit() {
   // get all retailer

   this.voucherID = this.route.snapshot.params['id'];


   this.usersevice.getRetailers().subscribe( res => {
    this.comboxarray = res;
  });

  // get current user
  this.userauth = this.afAuth.authState;

  this.afAuth.auth.onAuthStateChanged(user =>  {
    this.userId = user.uid;
    if (this.userId) {
      this.loadTodo();

    }
  });



  }

  loadTodo() {
    this.usersevice.getUser(this.userId).subscribe( res => {
      this.userinfos = res;

      if (this.voucherID) {

        this.loadvoucher();
      } else {
          this.balance = this.userinfos.eWallet;

      }



    });
  }

  loadvoucher() {
    this.todoService.getTodo(this.voucherID).subscribe( res => {
      this.todo = res;

      if (this.voucherID) {

        for (let index = 0; index < this.todo.usersCouponID.length ; index++)  {
          if (this.todo.usersCouponID[index].voucherUserId === this.userId ) {

        this.balance = this.todo.usersCouponID[index].voucherBalance;

      }
    }


      }
    });
  }


   requestpay () {
     if (this.qrdata.BillDue > this.balance) {
      this.presentToast('insufficient balance');

     } else {

      if (this.qrdata.RetailerEmail === '') {
        this.presentToast('please Choose a retailer');
      } else {
    this.qrdata.CustomerEmail = this.userinfos.email;
    this.qrdata.CustomerName = this.userinfos.userName;
    this.qrdata.RequestID =  this.qrdata.QrStatus + Date.now();

    if (this.voucherID) {
      this.qrdata.VoucherID =   this.voucherID;
    }

    this.qrrequest.addQrdata(this.qrdata).then(() => {
    });
  }
  }
  }

  public optionsFn(): void {

     console.log(this.Retialer);
    this.qrdata.RetailerEmail = this.Retialer.email;
    this.qrdata.retailerID = this.Retialer.id;
    console.log(this.Retialer.id);
  }

  signOut() {
    this.gplus.logout().then(() => {
      this.authservice.signOut();
    });
}
  addbill(val: any) {
    this.qrdata.BillDue = this.qrdata.BillDue + (val - (this.todo.discount / 100 * val) );
  }

  add(price: number, counter: number, arrayindex: number) {
     console.log(price);
     console.log(counter);
     console.log(arrayindex);
     this.qrdata.BillDue = 0;
     counter = counter + 1;
      this.todo.ItemList[arrayindex].counter = counter;
   //  this.qrdata.BillDue = this.qrdata.BillDue + (counter * price);
  }

  remove(price: number, counter: number, arrayindex: number) {
    console.log(price);
    console.log(counter);

    if ( this.todo.ItemList[arrayindex].counter > 0) {
      counter = counter - 1;
      this.todo.ItemList[arrayindex].counter = counter;
      this.qrdata.BillDue = 0;
    }

  //  this.todo.ItemList[arrayindex] = this.todo.ItemList[arrayindex]  - 1;
  //  this.qrdata.BillDue = this.qrdata.BillDue + (counter * price);
 }

 calculate() {
   let total = 0;
   for (let index = 0; index < this.todo.ItemList.length; index++) {
    total = total + (this.todo.ItemList[index].counter * this.todo.ItemList[index].price);
   }
   this.qrdata.BillDue = total - (this.todo.discount / 100 * total) ;

 }

 private async presentToast(message) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 3000
  });
  toast.present();
}
}
