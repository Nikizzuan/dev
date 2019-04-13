import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Product, ProductserviceService } from '../services/productservice.service';
import { RetailerinfoService } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-addcupon',
  templateUrl: './addcupon.page.html',
  styleUrls: ['./addcupon.page.scss'],
})
export class AddcuponPage implements OnInit {

todo: Todo = {
    CuponName: '',
    Expiredate: '',
    CreatedAt: new Date().getTime(),
    Retailer: '',
    CupponType: 'retailer',
    Amountalocate: null,
    CupponNum: null,
    ItemList: [],
    discount: null,
    Term: '',
    usersCouponID: []
};




Products: Product[];

// for userauth
userauth: Observable<firebase.User>;
authState: any = null;

todoId = null;
  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private datePicker: DatePicker,
    private productservice: ProductserviceService,
    private userservice: RetailerinfoService,
    private afAuth: AngularFireAuth,
    private navctrl: NavController) { }

  ngOnInit() {

    this.todoId = this.route.snapshot.params['id'];

    if (this.todoId) {
      this.loadTodo();
    }


    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

    this.userservice.getUser(user.uid).subscribe( res => {
      this.todo.Retailer = res.storeName;
    });
      this.productservice.inttansid(user.uid);
      this.productservice.getProducts().subscribe( res => {
        this.Products = res;
      });
    });

  // get retailer info
/*
  this.userauth = this.afAuth.authState;

  this.afAuth.auth.onAuthStateChanged(user =>  {

    this.userservice.getUser(user.uid).subscribe( res => {
      this.todo.Retailer = res.storeName;
      const retailername = res.storeName;


      // tslint:disable-next-line:no-shadowed-variable
      this.productservice.getProducts().subscribe( res => {

          let index2 = 0;
        for (let index = 0; index < res.length ; index++) {

          if (res[index].retailer === retailername ) {
             this.Products[index2] = res[index];
             index2 = index2 + 1;
          }

        }

      });

    });


  });
  */

  }



  loadTodo() {
    this.todoService.getTodo(this.todoId).subscribe( res => {
      this.todo = res;
    });
  }


  saveTodo() {

    for (let index = 0; index < this.Products.length; index++) {


       if (this.Products[index].ischecked === true) {
           this.todo.ItemList.push(this.Products[index]);
       }

    }

   // this.todo.ItemList = this.Products;


    if (this.todoId) {
      this.todoService.Updatetod(this.todo, this.todoId).then(() => {
        this.goBack();
      });
    } else {
       this.todoService.addTodo(this.todo).then(() => {
        this.goBack();
       });
    }
  }

  signOut() {
    this.authservice.signOut();
  }


  datepicker() {

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  goBack() {

    this.navctrl.goBack();

  }

}
