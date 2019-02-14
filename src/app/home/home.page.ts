import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, NavController, ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
// import { loginpage } from  './loginpage/loginpage.page'
// test for surface pro
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: Todo[];
  user: Observable<firebase.User>;
  tabsinfo: any;
  usercheck: any;

  transition:  any = {
    icon: 'arrow-round-down',
    icon2: 'remove',
    title: 'Food and beverages',
    amount: '07.00',
    date: Date.now(),
    color: 'red'

 };

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
 }
 userId = null;
 // for userauth
userauth: Observable<firebase.User>;
authState: any = null;


  constructor(private todoService: TodoService,
  private router: Router, 
  private authservice: AuthService,
  private userservice: RetailerinfoService,
  private afAuth: AngularFireAuth,
  public actionSheetController: ActionSheetController) {
      this.user = authservice.currentUserObservable;
      this.tabsinfo = null; }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid
      if (this.userId) {
        this.loadTodo();
      }
    });
     

  
 
 
       
       this.todoService.getTodos().subscribe( res => {
 
           let index2 = 0;
         for (let index = 0; index < res.length ; index++) {
           

            
          for (let index3 = 0; index3 < res[index].usersCouponID.length ; index3++) {
             if (res[index].usersCouponID[index3] === this.userId){
              this.viewArray[index2] = res[index];
              index2 = index2 + 1;

             }
           
          }
          
         
           
         }
 
       });
 

  }

  loadTodo() {
    this.userservice.getUser(this.userId).subscribe( res => {
      this.userinfos = res;
    
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
          });
        } else {
       
        }
        this.loadTodo(); 
      }
   


}
