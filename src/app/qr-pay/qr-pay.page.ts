import { Component, OnInit } from '@angular/core';
import { QRrequestService, Qrdata } from '../services/qrrequest.service';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';


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
   };
   userId = null;
   // for userauth
  userauth: Observable<firebase.User>;
  authState: any = null;

  constructor(private qrrequest: QRrequestService,
    private usersevice: RetailerinfoService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
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

    });
  }


   requestpay () {
    this.qrdata.CustomerEmail = this.userinfos.email;
    this.qrdata.CustomerName = this.userinfos.userName;
    this.qrdata.RequestID =  this.qrdata.QrStatus + Date.now();

    if (this.voucherID) {
      this.qrdata.VoucherID =   this.voucherID;
    }

    this.qrrequest.addQrdata(this.qrdata).then(() => {
    });


  }

  public optionsFn(): void {

     console.log(this.Retialer);
    this.qrdata.RetailerEmail = this.Retialer.email;
    this.qrdata.retailerID = this.Retialer.id;
    console.log(this.Retialer.id);
  }

  signOut() {
    this.authservice.signOut();
  }


}
