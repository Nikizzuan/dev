import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { Transaction, TransactionService } from '../services/transaction.service';
import { LocalnotificationService } from '../services/localnotification.service';

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
    usersCouponID: []
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
  academicYear: ''
 };

todoId = null;
usercoupon = null;

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
    private toastCtrl: ToastController
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
    });
  }

  saveTodo() {


    this.todo.CupponNum = this.todo.CupponNum - 1;

    this.todo.usersCouponID.push({
      voucherUserId: this.userID,
      voucherBalance: this.todo.Amountalocate});
  console.log(this.todo.usersCouponID);
if ( this.userinfos.eWallet >= this.todo.Amountalocate) {

  if (this.buy( this.todo.Amountalocate ) === true) {
    if (this.todoId) {
      this.todoService.Updatetod(this.todo, this.todoId).then(() => {
        this.localnoti.scheduleNotificationUser(1, 20, 'Donation', this.todoId , this.todo.usersCouponID.lenght ,
        'Voucher Expire', 'Your voucher expire will be donate to cahrity to avoid waste');
        this.goBack();
      });
    } else {
       this.todoService.addTodo(this.todo).then(() => {
        this.localnoti.scheduleNotificationUser(1, 20, 'Donation', this.todoId , this.todo.usersCouponID.lenght ,
        'Voucher Expire', 'Your voucher expire will be donate to cahrity to avoid waste');
        this.goBack();
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

}
