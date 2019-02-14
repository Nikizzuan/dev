import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { RetailerinfoService } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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

todoId = null;
usercoupon = null

// user part

userID: any;
userauth: Observable<firebase.User>;
authState: any = null;

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private userservice: RetailerinfoService,
    private afAuth: AngularFireAuth ) { }

  ngOnInit() {

    // get user id 

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;
  
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

  
  loadTodo() {
    this.todoService.getTodo(this.todoId).subscribe( res => {
      this.todo = res;
    });
  }

  saveTodo() {


    this.todo.CupponNum = this.todo.CupponNum- 1;

    this.todo.usersCouponID[this.todo.usersCouponID.length ] = this.userID;

    if (this.todoId) {
      this.todoService.Updatetod(this.todo, this.todoId).then(() => {
      })
    } else {
       this.todoService.addTodo(this.todo).then(() => {
       });
    }
  }

}
