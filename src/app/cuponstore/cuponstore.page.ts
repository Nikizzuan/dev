import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';


@Component({
  selector: 'app-cuponstore',
  templateUrl: './cuponstore.page.html',
  styleUrls: ['./cuponstore.page.scss'],
})
export class CuponstorePage implements OnInit {

  todos: Todo[];
  private subscription: Subscription = new Subscription();
  Retialer: any;
  fabbutton: any;
  comboxarray: Userinfo[];
  constructor(private todoService: TodoService,
    private usersevice: RetailerinfoService,
    private gplus: GooglePlus, private authservice: AuthService) { }

  ngOnInit() {

    this.todoService.Oninit();
    this.todoService.getTodos().subscribe( res => {
    this.todos = res;
  });

  this.usersevice.getRetailers().subscribe( res => {
    this.comboxarray = res;
  });

  }


  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  signOut() {
    this.gplus.logout().then(() => {
      this.authservice.signOut();
    });
}


public optionsFn(): void {

  console.log(this.Retialer);
if (this.Retialer === 'All') {
  this.todoService.Oninit();
    this.todoService.getTodos().subscribe( res => {
    this.todos = res;
  });
} else {
  this.todoService.Oninit2(this.Retialer.storeName);
  this.todoService.getTodos().subscribe( res2 => {
  this.todos = res2;
});
}
}



}
