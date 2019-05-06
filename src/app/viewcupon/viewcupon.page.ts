import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { Transaction, TransactionService } from '../services/transaction.service';
import { LocalnotificationService } from '../services/localnotification.service';
import { AdminaccountService, Transaction2 } from '../services/adminaccount.service';

@Component({
  selector: 'app-viewcupon',
  templateUrl: './viewcupon.page.html',
  styleUrls: ['./viewcupon.page.scss'],
})
export class ViewcuponPage implements OnInit {


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
  icon: 'arrow-up',
  icon2: 'add',
  title: '',
  amount: 0,
  date: Date.now(),
  expense:  true,
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

todoId = null;
usercoupon = null;
limmitend = null;
ADMINID = 'TMFUWOirDNNFlLFmEVSvxlQwiju1';

// user part

userID: any;
userauth: Observable<firebase.User>;
authState: any = null;

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private userservice: RetailerinfoService,
    private afAuth: AngularFireAuth,
    private navctrl: NavController,
    private localnoti: LocalnotificationService,
    private transcationservice: TransactionService,
    private toastCtrl: ToastController,
    private adminservice: AdminaccountService
    ) { }

  ngOnInit() {

    // get user id

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;
        this.loadTodouser();
    });


    this.usercoupon = this.route.snapshot.params['usercoupon'];
    if (this.usercoupon === 'true') {
      this.usercoupon = this.route.snapshot.params['usercoupon'];
    } else {
      this.usercoupon = null;
    }

    this.todoId = this.route.snapshot.params['id'];

    if (this.todoId) {
      this.loadTodo();

    }


  }

  loadTodouser() {
    this.userservice.getUser(this.userID).subscribe( res => {
      this.userinfos = res;

    });
  }


  loadTodo() {
    this.todoService.getTodo(this.todoId).subscribe( res => {
      this.todo = res;
      if (this.usercoupon === 'true') {

      } else {

        for (let index = 0; index < this.todo.usersCouponID.length ; index++)  {
          if (this.todo.usersCouponID[index].voucherUserId === this.userID ) {
            this.limmitend = 'true';
          }
        }
      }


    });
  }

  saveTodo() {

 // const RemainTime = new Date(this.todo.Expiredate - Date.now()).getMinutes();
 const RemainTime = this.todo.Expiredate;
   // expiretime
const indextoput = this.todo.usersCouponID.length;
  console.log(this.todo.usersCouponID);
if ( this.userinfos.eWallet >= this.todo.Amountalocate) {

  this.todo.CupponNum = this.todo.CupponNum - 1;

  this.todo.usersCouponID.push({
    voucherUserId: this.userID,
    voucherBalance: this.todo.Amountalocate,
    voucherindex: this.todo.usersCouponID.length
  });

    if ( this.todo.CupponNum === 0 ) {
      this.todo.expire = 'true';
    }

  if (this.buy( this.todo.Amountalocate ) === true) {
    if (this.todoId) {
      this.todoService.Updatetod(this.todo, this.todoId).then(() => {
        this.localnoti.scheduleNotificationUser( Date.now(), RemainTime - 43200000, 'notifed', this.todoId, this.userID , indextoput ,
        'Voucher Expire', 'Your voucher will be expire in 12 hours ');
        this.localnoti.scheduleNotificationUser( Date.now(), RemainTime, 'Donation', this.todoId, this.userID , indextoput ,
        'Voucher Expire', 'Your voucher expire will be donate to cahrity to avoid waste');
        this.navctrl.navigateForward('home');
      });
    } else {
       this.todoService.addTodo(this.todo, this.todoId).then(() => {
        this.localnoti.scheduleNotificationUser( Date.now(),  RemainTime - 43200000, 'notifed', this.todoId, this.userID , indextoput ,
        'Voucher Expire', 'Your voucher will be expire in 12 hours ');
        this.localnoti.scheduleNotificationUser( Date.now(), RemainTime, 'Donation', this.todoId, this.userID , indextoput ,
        'Voucher Expire', 'Your voucher expire will be donate to cahrity to avoid waste');
        this.navctrl.navigateForward('home');
       });
    }
  }
} else {
 // no enough money
 this.presentToast('insufficient balance');

}

  }


  buy(amount): boolean {

    this.userinfos.eWallet = this.userinfos.eWallet - amount;

    if (this.userID) {
      this.userservice.UpdateUser(this.userinfos, this.userID).then(() => {
        this.Addtransaction(amount, 'You have Bought a Voucher for  RM ' + amount);
      });
      return true;
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
    this.transaction.Userid = this.userID;
    this.transaction.retailer = null;

    if (this.userID) {
      this.transcationservice.addtransaction(this.transaction).then(() => {
        // tslint:disable-next-line:max-line-length
      //  this.addaccountinfo(this.transaction.amount, this.userinfos.userName + 'Has Buy a voucher with the system for RM ' + this.transaction.amount );

      });
    } else {

    }
  }


  goBack() {

    this.navctrl.goBack();

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
  this.adminacc.month = new Date().getMonth();
  this.adminacc.username = this.userinfos.userName;

  this.adminservice.addtransaction(this.adminacc).then(() => {
    // this.LOADADMIN();

  });

}

LOADADMIN() {
  this.userservice.getUser(this.ADMINID).subscribe( res => {
    this.userinfos = res;
    this.userinfos.eWallet =  this.userinfos.eWallet + this.transaction.amount;
    this.userservice.UpdateUser(this.userinfos, this.ADMINID).then(() => {} );
  });
}



}
