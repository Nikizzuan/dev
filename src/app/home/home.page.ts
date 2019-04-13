import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform, NavController, ActionSheetController, Slide, Slides, List, Card } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
import { Transaction, TransactionService } from '../services/transaction.service';
// import { loginpage } from  './loginpage/loginpage.page'
// test for surface pro




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slidingList') slidingList: Slides;


  todos: Todo[];
  user: Observable<firebase.User>;
  tabsinfo: any;
  usercheck: any;

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

 alltransaction: Transaction[];

 viewArray: Todo[] = [];

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


  constructor(private todoService: TodoService,
  private router: Router,
  private transcationservice: TransactionService,
  private authservice: AuthService,
  private userservice: RetailerinfoService,
  private afAuth: AngularFireAuth,
  public actionSheetController: ActionSheetController) {
      this.user = authservice.currentUserObservable;
      this.tabsinfo = null; }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid;
      if (this.userId) {
        this.loadTodo();
        this.loadtranscation();
      }
    });


       this.todoService.Oninit();
       this.todoService.getTodos().subscribe( res => {

           let index2 = 0;
         for (let index = 0; index < res.length ; index++) {

          for (let index3 = 0; index3 < res[index].usersCouponID.length ; index3++) {
             if (res[index].usersCouponID[index3].voucherUserId === this.userId) {
              this.viewArray[index2] = res[index];
              index2 = index2 + 1;

             }

          }

         }

      });


  }

  // Stop the slide autoplay when the view will leave
  loadTodo() {
    this.userservice.getUser(this.userId).subscribe( res => {
      this.userinfos = res;

    });
  }

  loadtranscation() {

    this.transcationservice.inttansid(this.userId);

    this.transcationservice.gettransactions().subscribe( res => {
      this.alltransaction = res;
    });

  }

  remove(item) {
    this.todoService.removeTodo(item.id);
    /* if (this.afAuth.auth.onAuthStateChanged) {
      this.navCtrl.navigateForward('loginpage');
    }
    */
  }

  signOut() {
    this.authservice.signOut();
  }



  showTransition() {
this. tabsinfo = 1;
this. loadtranscation();
  }
  showVoucher() {
    this. tabsinfo = null;
      }

      async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
          header: 'Top Up Menu',
          buttons: [{
            text: 'RM 10.00',
            role: 'destructive',
            icon: 'add',
            handler: () => {
              console.log('Top Up  RM 10.00');
              this.topup(10);

            }
          }, {
            text: 'RM 30.00',
            icon: 'add',
            handler: () => {
              console.log('Top Up  RM 30.00');
              this.topup(30);
            }
          }, {
            text: 'RM 50.00',
            icon: 'add',
            handler: () => {
              console.log('Top Up  RM 50.00');
              this.topup(50);

            }
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
        });
        await actionSheet.present();
      }

      topup(amount) {

        this.userinfos.eWallet = this.userinfos.eWallet + amount;

        if (this.userId) {
          this.userservice.UpdateUser(this.userinfos, this.userId).then(() => {

            this.Addtransaction(amount, 'Top Up  RM ' + amount);
            this.loadtranscation();


          });
        } else {

        }
        this.loadTodo();
      }

      Addtransaction(amount: number, title: string) {

        this.transaction.icon = 'arrow-up';
        this.transaction.icon2 = 'add';
        this.transaction.title = title;
        this.transaction.amount = amount;
        this.transaction.date = Date.now();
        this.transaction.color = 'greeen';
        this.transaction.expense =  null;
        this.transaction.month = null;
        this.transaction.Userid = this.userId;
        this.transaction.retailer = null;

        if (this.userId) {
          this.transcationservice.addtransaction(this.transaction).then(() => {
          });
        } else {

        }
        this.loadTodo();
      }




}
