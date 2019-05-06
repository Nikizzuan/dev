import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRrequestService, Qrdata } from '../services/qrrequest.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction, TransactionService } from '../services/transaction.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { TodoService, Todo } from '../services/todo.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {

  qrdata: Qrdata = {
    RequestID: '',
    CustomerEmail: '',
    RetailerEmail: '',
    BillDue: null,
    QrStatus: '',
    CustomerName: '',
    QrCode: '',
    VoucherID: '',
    retailerID: ''
    };

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

     retailerinfo: Userinfo = {
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

     voucher: Todo;

    transcationid: any;
    qrcodestatus: any = null;

    userID: any;
userauth: Observable<firebase.User>;

  constructor(private barcodeScanner: BarcodeScanner,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private userservice: RetailerinfoService,
    private transcationservice: TransactionService,
    private todoService: TodoService,
    private qrservice: QRrequestService,
    private navctr: NavController) {


     }

  ngOnInit() {



  }



  ionViewDidEnter() {

    this.transcationid = this.route.snapshot.params['id'];

    if (this.transcationid) {

      this.load(this.transcationid);
    }

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;
        this.loadTodoUser( user.uid);
    });


  }

  loadTodoUser( id: any) {
    this.userservice.getUser(id).subscribe( res => {
      this.userinfos = res;

    });
  }


  loadTodoRetailer(id: any) {
    this.userservice.getUser(id).subscribe( res => {
      this.retailerinfo = res;

    });
  }


  load(id: any) {
    this.qrservice.getQrdata(id).subscribe( res => {
      this.qrdata = res;
      if (this.qrdata.VoucherID) {

        this.loadvoucher(this.qrdata.VoucherID);
      }


    if (this.qrdata) {

      this.loadTodoRetailer( this.qrdata.retailerID);

     }
      console.log(this.qrdata.QrCode);

      this.qrcodestatus = 'Please scan the QR code that has been display by the Retailer';
    } );
  }

  loadvoucher(id: any) {

    this.todoService.getTodo(id).subscribe( res => {
      this.voucher = res;
    } );

  }


  scancode() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (barcodeData.text === this.qrdata.QrCode ) {
        this.qrcodestatus = 'Succsefull';
        if (this.qrdata.VoucherID) {
          this.buyfromeVoucher(this.qrdata.BillDue);
        } else {
          this.buyfromewalet(this.qrdata.BillDue);
        }
       //  this.transaction();
      } else {
        this.qrcodestatus = 'Unsuccsefull, invalid qr' + barcodeData.text ;
      }
     }).catch(err => {
         console.log('Error', err);
     });

  }



  buyfromewalet(amount): boolean {

    this.userinfos.eWallet = this.userinfos.eWallet - amount;

    if (this.userID) {

      this.userservice.UpdateUser(this.userinfos, this.userID ).then(() => {

        this.retailerinfo.eWallet = this.retailerinfo.eWallet + amount;

        this.userservice.UpdateUser(this.retailerinfo, this.qrdata.retailerID).then(() => {
          this.Addtransaction(amount, this.userinfos.userName + ' have Use QR Pay  for  RM ' + amount);
        });
      });
      return true;
    }
  }

  buyfromeVoucher(amount): boolean {

    for (let index = 0; index < this.voucher.usersCouponID.length ; index++)  {
       if (this.voucher.usersCouponID[index].voucherUserId === this.userID ) {

        this.voucher.usersCouponID[index].voucherBalance = this.voucher.usersCouponID[index].voucherBalance - amount;

       }
    }

    if (this.userID) {

   this.todoService.Updatetod(this.voucher, this.qrdata.VoucherID).then(() => {
    this.retailerinfo.eWallet = this.retailerinfo.eWallet + amount;

    this.userservice.UpdateUser(this.retailerinfo, this.qrdata.retailerID).then(() => {
      this.Addtransaction(amount, this.userinfos.userName + ' have Use QR Pay using ' + this.voucher.CuponName +
      ' Voucher for  RM ' + amount);
    });

  });
      return true;
    }
  }


  Addtransaction(amount: number, title: string) {
   // x abis
    this.transaction.icon = 'arrow-down';
    this.transaction.icon2 = 'remove';
    this.transaction.title = title;
    this.transaction.amount = amount;
    this.transaction.date = Date.now();
    this.transaction.color = 'red';
    this.transaction.expense =  false;
    this.transaction.month = new Date().getMonth();
    this.transaction.Userid = this.userID;
    this.transaction.retailer = this.qrdata.RetailerEmail;

    if (this.userID) {
      this.transcationservice.addtransaction(this.transaction).then(() => {
        this.EndTransacttion();
      });
    } else {

    }
  }


  EndTransacttion () {
    this.qrdata.QrStatus = 'Finish';
    this.qrservice.addQrdata(this.qrdata).then(() => {

        this.navctr.navigateForward('home');
    });


  }



}
